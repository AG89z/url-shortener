import { Request, Response, NextFunction } from "express";

export const wrapAsync = function (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  const wrapper = (req: Request, res: Response, next: NextFunction) => {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, like an error handler.
    fn(req, res, next).catch(next);
  };

  return wrapper;
};
