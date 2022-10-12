import passport from 'passport';
import type { NextFunction, Request, Response } from 'express';
import type { IUser } from '@types';

interface IAuth extends Request {
  user: IUser;
}

export const auth = (req: IAuth, res: Response, next: NextFunction): void => {
  passport.authenticate(
    'jwt',
    {
      session: false,
    },
    (error, user) => {
      if (error || !user) {
        res.status(401).send('Unauthorized');
      }
      req.user = user;
      next();
    },
  )(req, res, next);
};
