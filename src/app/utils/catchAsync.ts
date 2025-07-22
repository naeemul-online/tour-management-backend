import { NextFunction, Request, Response } from "express";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const catchAsync =
  (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fn(req, res, next).catch((err: any) => {
        next(err);
      })
    );
  };
