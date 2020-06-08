import { Request, Response, NextFunction } from "express";

import makeError from "./utils/make-error";

function logError(err: Error) {
  console.log("Error caught by the links router handler:");
  console.log(err);
}

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  logError(err);

  if (err.name === "UnauthorizedError") {
    return res.status(401).json(makeError("UNAUTHORIZED", err.message));
  }

  return res
    .status(500)
    .json(makeError("SERVER_ERROR", "Unexpected server error"));
}

export default errorHandler;
