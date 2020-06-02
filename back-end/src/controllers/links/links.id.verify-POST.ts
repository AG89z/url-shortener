import { Request, Response } from "express";

import { getLink } from "../../use-cases/links";

import makeError from "../../utils/makeError";
import { compareHash } from "../../libs/hash";

type RequestBody = {
  password: string;
};

async function linksIdVerifyPOST(req: Request, res: Response) {
  const { id } = req.params;

  const link = await getLink(id, false);

  if (!link) {
    return res.status(404).json(makeError("LINK NOT FOUND", "Link not found"));
  }

  const { password } = req.body as RequestBody;

  if (!password) {
    return res.status(400).json(makeError("BAD REQUEST", "Password required"));
  } else {
    if (
      !link.password ||
      (link.password && (await compareHash(password, link.password)))
    ) {
      return res.redirect(link.destination);
    } else {
      return res.status(403).json(makeError("UNAUTHORIZED", "Wrong password"));
    }
  }
}

export default linksIdVerifyPOST;
