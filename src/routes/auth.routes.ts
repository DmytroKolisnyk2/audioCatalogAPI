import type { ApiRoutes } from '@enums';
import { AuthRoutes } from '@enums';
import { apiPath, wrap } from '@helpers';
import type { Services } from '@services';
import { Router } from 'express';
// import type { Request, NextFunction, Response } from 'express';

export const initAuthRoutes = (
  { authService }: Services,
  path: ApiRoutes,
): Router => {
  const router = Router();
  router.get(
    apiPath(path, AuthRoutes.CURRENT),
    wrap(() => Promise.resolve('Get current')),
  );
  router.post(
    apiPath(path, AuthRoutes.LOGOUT),
    wrap(() => Promise.resolve('Logout')),
  );
  router.post(
    apiPath(path, AuthRoutes.LOGIN),
    wrap(() => Promise.resolve('Login')),
  );
  router.post(
    apiPath(path, AuthRoutes.REGISTER),
    wrap((req) => authService.register(req)),
  );

  return router;
};
