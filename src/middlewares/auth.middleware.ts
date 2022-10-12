import passport from 'passport';
import type { NextFunction, Response } from 'express';
import type { IAuth } from '@types';
import { Unauthorized } from 'error';

export const auth = (req: IAuth, res: Response, next: NextFunction): void => {
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
