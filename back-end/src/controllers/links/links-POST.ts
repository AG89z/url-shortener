import { Response } from "express";
import LinksService from "../../use-cases/links";

import { AuthenticatedRequest } from "../../middlewares/checkJwt";

import makeError from "../../utils/makeError";

type RequestBody = {
  destination: string;
  password: string;
  expiry: string;
};

async function linksPOST(req: AuthenticatedRequest, res: Response) {
  const { user } = req;

  const { destination, password, expiry } = req.body as RequestBody;

  const link = await LinksService.addLink({
    destination,
    author: user!.id,
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
}

export default linksPOST;
