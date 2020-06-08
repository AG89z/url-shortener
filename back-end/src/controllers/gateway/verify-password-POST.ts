import { Request, Response } from "express";

import { isError, lookupLink } from "../../services/links";

import { compareHash } from "../../libs/hash";

type RequestBody = {
  password: string;
};

function error(message: string) {
  return {
    message,
  };
}

async function verifyPassword(req: Request, res: Response) {
  const { link } = req.params;

  const found = await lookupLink(link, false);

  if (isError(found)) {
    return res.status(404).json(error(found.message));
  }

  const { password } = req.body as RequestBody;

  if (!password) {
    return res.status(400).json(error("Password required"));
  } else {
    if (
      !found.password ||
      (found.password && (await compareHash(password, found.password)))
    ) {
      return res.status(200).json({ destination: found.destination });
    } else {
      return res.status(403).json(error("Wrong password"));
    }
  }
}

export default verifyPassword;
