import { GenresError } from 'error';
import type { NextFunction, Request, Response } from 'express';

export const parseGenresMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const genresString: string = req.body.genres;
    if (!(typeof genresString === 'string')) throw new GenresError(req.t);

    req.body.genres = genresString.split(',');
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ 'message': error.message });
  }
};
