import type { ApiRoutes } from '@enums';
import { AuthRoutes } from '@enums';
import { apiPath, wrap } from '@helpers';
import { JoiValidationMiddleware, auth } from '@middlewares';
import type { Services } from '@services';
import { Router } from 'express';
import { authSchema } from '@validation';

export const initAuthRoutes = (
  { authService }: Services,
  path: ApiRoutes,
): Router => {
  const router = Router();
  router.get(
    apiPath(path, AuthRoutes.CURRENT),
    auth,
    wrap((req) => authService.current(req)),
  );
  router.post(
    apiPath(path, AuthRoutes.LOGOUT),
    wrap(() => Promise.resolve()),
  );
  router.post(
    apiPath(path, AuthRoutes.LOGIN),
    JoiValidationMiddleware(authSchema),
    wrap((req) => authService.login(req)),
  );
  router.post(
    apiPath(path, AuthRoutes.REGISTER),
    JoiValidationMiddleware(authSchema),
    wrap((req) => authService.register(req)),
  );

  return router;
};
