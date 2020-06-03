import { Request, Response, NextFunction } from "express";

function logError(err: Error) {
  console.log("Error caught by the gateway router handler:");
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

  return res.status(500).render("../src/views/error", {
    status: 500,
    message: "Unexpected server error",
  });
}

export default errorHandler;
