import { Response } from "express";
import LinksService, { isError } from "../../services/links";

import { AuthenticatedRequest } from "../../libs/checkJwt";

type RequestBody = {
  destination: string;
  password: string;
  expiry: string;
};

function error(message: string) {
  return {
    message,
  };
}

async function createLink(req: AuthenticatedRequest, res: Response) {
  const { user } = req;

  const { destination, password, expiry } = req.body as RequestBody;

  const link = await LinksService.addLink({
    destination,
    author: user?.id || "anonymous",
    password,
    expiry,
  });

  if (isError(link)) {
    return res.status(403).json(error(link.message));
  } else {
    return res.status(201).json(link);
  }
}

export default createLink;
