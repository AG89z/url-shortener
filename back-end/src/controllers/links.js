const { Router } = require("express");

const LinksService = require("../services/links");
const { wrapAsync } = require("../utils/wrapAync");
const checkJwt = require("../middlewares/checkJwt");
const makeError = require("../utils/makeError");

const router = Router();
router.post(
  "/v0/links",
  // @ts-ignore
  checkJwt,
  wrapAsync(async (req, res) => {
    const { user } = req;
    const { destination, password, expiry } = req.body;

    const link = await LinksService.createOne({ destination, author: user.id, password, expiry });

    if (link) {
      res.status(201).json(link);
    } else {
      res
        .status(400)
        .json(
          makeError("BAD REQUEST", `You can't create a short link for the domain ${destination}`)
        );
    }
  })
);

router.get(
  "/v0/links",
  // @ts-ignore
  checkJwt,
  wrapAsync(async (req, res) => {
    const { user } = req;

    const links = (await LinksService.getAll()).filter((link) => link.author === user.id);

    res.status(200).json(links);
  })
);

router.get(
  "/v0/links/:id",
  // @ts-ignore
  checkJwt,
  wrapAsync(async (req, res) => {
    const { user } = req;
    const { id } = req.params;

    const link = await LinksService.getOne(id);

    const authorized = link && link.author === user.id;

    if (link && authorized) {
      res.status(200).json(link);
    } else if (link && !authorized) {
      res.status(401).json(makeError("UNAUTHORIZED", "You are not authorized to view this link"));
    } else {
      res.status(404).json(makeError("NOT FOUND", `No link found with id ${id}`));
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

module.exports = router;
