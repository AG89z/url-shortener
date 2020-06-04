import { Request, Response } from "express";

import service, { isError } from "../../service";

import path from "path";

type RequestBody = {
  password: string;
};

function error(message: string) {
  return {
    message,
  };
}

const errorView = path.join(__dirname, "../../../src/views/error");

async function verifyPassword(req: Request, res: Response) {
  const { link } = req.params;
  const { password } = req.body as RequestBody;

  if (!password) {
    return res.status(400).json(error("Password required"));
  }

  const verification = await service.verifyPassword(link, password);

  if (isError(verification)) {
    return res.status(404).json(error(verification.message));
  }

  if (verification.reply === "WRONG") {
    return res.status(403).json(error("Wrong password"));
  } else {
    if (verification.destination) {
      return res.status(200).json({ destination: verification.destination });
    } else {
      return res.status(404).render(errorView, {
        message: `The link ${link} has not destination URL`,
        status: 404,
      });
    }
  }
}

export default verifyPassword;
