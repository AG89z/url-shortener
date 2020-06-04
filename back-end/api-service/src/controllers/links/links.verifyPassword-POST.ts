import { Response } from "express";
import { AuthenticatedRequest } from "../../libs/checkJwt";

import LinksService, { isError } from "../../services/links";

import makeError from "./utils/make-error";
import { compareHash } from "../../libs/hash";

type RequestBody = {
  link: string;
  password: string;
};

async function verifyPasswordPOST(req: AuthenticatedRequest, res: Response) {
  const { link, password } = req.body as RequestBody;

  const found = await LinksService.lookupLink(link, false);

  if (isError(found)) {
    return res.status(404).json(makeError(found.type, found.message));
  } else {
    if (!found.password) {
      return res.status(200).json({
        reply: "NOT_PROTECTED",
        destination: found.destination,
      });
    }

    if (await compareHash(password, found.password)) {
      return res.status(200).json({
        reply: "CORRECT",
        destination: found.destination,
      });
    } else {
      return res.status(200).json({
        reply: "WRONG",
      });
    }
  }
}

export default verifyPasswordPOST;
