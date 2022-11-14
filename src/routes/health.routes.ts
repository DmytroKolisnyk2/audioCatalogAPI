import type { ApiRoutes } from '@enums';
import { wrap } from '@helpers';
import { Router } from 'express';

export const initHealthRoutes = (path: ApiRoutes): Router => {
  const router = Router();
  router.get(
    path,
    wrap(() => Promise.resolve('health')),
  );

  return router;
};
