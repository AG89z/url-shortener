import { Router, Response } from "express";

// import LinksService from "../services/links";
import LinksService from "../use-cases";
import { wrapAsync } from "../utils/wrapAync";
import { AuthenticatedRequest, checkJwt } from "./middlewares/checkJwt";
import makeError from "../utils/makeError";

const router = Router();

function userUndefinedError(res: Response) {
  return res.status(500).json(makeError("SERVER ERROR", "No user defined"));
}

router.post(
  "/v0/links",
  checkJwt,
  wrapAsync(async (req: AuthenticatedRequest, res) => {
    const { user } = req;

    if (!user) {
      return userUndefinedError(res);
    }

    const { destination, password, expiry } = req.body as {
      destination: string;
      password: string;
      expiry: string;
    };

    const link = await LinksService.addLink({
      destination,
      author: user.id,
      password,
      expiry,
    });

    if (link) {
      return res.status(201).json(link);
    } else {
      return res
        .status(400)
        .json(
          makeError(
            "BAD REQUEST",
            `You can't create a short link for the domain ${destination}`
          )
        );
    }
  })
);

router.get(
  "/v0/links",
  checkJwt,
  wrapAsync(async (req: AuthenticatedRequest, res) => {
    const { user } = req;

    if (!user) {
      return userUndefinedError(res);
    }

    const links = await LinksService.getAllLinks(user.id);

    return res.status(200).json(links);
  })
);

router.get(
  "/v0/links/:id",
  checkJwt,
  wrapAsync(async (req: AuthenticatedRequest, res) => {
    const { user } = req;

    if (!user) {
      return userUndefinedError(res);
    }

    const { id } = req.params;

    const link = await LinksService.getLink(id);

    const authorized = link && link.author === user.id;

    if (link && authorized) {
      return res.status(200).json(link);
    } else if (link && !authorized) {
      return res
        .status(401)
        .json(
          makeError("UNAUTHORIZED", "You are not authorized to view this link")
        );
    } else {
      return res
        .status(404)
        .json(makeError("NOT FOUND", `No link found with id ${id}`));
    }
  })
);

//TODO
// router.patch(
//   "/v0/links/:id",
//   wrapAsync(async (req, res) => {
//     const { id } = req.params;

//     res.status(200).end();
//   })
// );

//TODO
// router.delete(
//   "/v0/links/:id",
//   wrapAsync(async (req, res) => {
//     const { id } = req.params;

//     res.status(200).end();
//   })
// );

export = router;
