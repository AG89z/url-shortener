import { Request, Response } from "express";

import makeError from "../errors/makeError";
import HttpError from "../errors/HttpError";

function errorHandler(err: HttpError, req: Request, res: Response): void {
  console.log(err.stack);
  if (err.name === "UnauthorizedError") {
    res.status(401).json(makeError("UNAUTHORIZED", err.message));
  } else if (err.status < 500) {
    res.status(err.status).json(makeError(err.name.toUpperCase(), err.message));
  } else {
    res.status(500).json(makeError("SERVER ERROR", "Unexpected server error"));
  }
}

export = errorHandler;
