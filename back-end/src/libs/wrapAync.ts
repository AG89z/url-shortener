import { Request, Response, NextFunction } from "express";

export const wrapAsync = function (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
