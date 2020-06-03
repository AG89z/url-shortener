import { Request, Response } from "express";

import { getLink } from "../../use-cases/links";

import { compareHash } from "../../libs/hash";
import makeError from "../../errors/makeError";

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
    return res.status(400).json(makeError("NO PASSWORD", "Password required"));
  } else {
    if (
      !link.password ||
      (link.password && (await compareHash(password, link.password)))
    ) {
      return res.status(200).json({ destination: link.destination });
    } else {
      return res
        .status(403)
        .json(makeError("WRONG PASSWORD", "Wrong password"));
    }
  }
}

export default linksIdVerifyPOST;
