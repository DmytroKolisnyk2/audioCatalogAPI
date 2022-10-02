import { statusCode } from '@enums';
import type { Request, Response, NextFunction } from 'express';
import { ErrorMessage } from '@utils';

export const errorHandler = (
  err: ErrorMessage | Error,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  if (!err) {
    next();
  }

  if (err instanceof ErrorMessage) {
    const { method, url } = req;
    const errorResponse = {
      path: url,
      method: method,
      statusCode: err.status,
      message: err.message,
    };

    console.log(errorResponse);

    return res.status(err.status).json({
      error: err.message,
    });
  }

  console.log(err.message);

  return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
    error: 'INTERNAL ERROR',
  });
};
