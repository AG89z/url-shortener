import { Response } from "express";
import LinksService, { isError } from "../../use-cases/links";

import { AuthenticatedRequest } from "../../middlewares/checkJwt";

import makeError from "../../errors/makeError";

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

  if (isError(link)) {
    return res.status(403).json(makeError(link.type, link.message));
  } else {
    return res.status(201).json(link);
  }
}

export default linksPOST;
