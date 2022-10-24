import passport from 'passport';
import type { NextFunction, Request, Response } from 'express';

export const nonStringAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  passport.authenticate(
    'jwt',
    {
      session: false,
    },
    (_error, user) => {
      req.user = user;
      next();
    },
  )(req, res, next);
};
