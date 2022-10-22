import passport from 'passport';
import type { NextFunction, Request, Response } from 'express';
import { Unauthorized } from 'error';

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate(
    'jwt',
    {
      session: false,
    },
    (error, user) => {
      if (error || !user) {
        throw new Unauthorized(req.t);
      }
      req.user = user;
      next();
    },
  )(req, res, next);
};
