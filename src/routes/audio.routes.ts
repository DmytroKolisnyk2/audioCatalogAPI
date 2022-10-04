import type { ApiRoutes } from '@enums';
import { wrap } from '@helpers';
import type { Services } from '@services';
import { Router } from 'express';

export const initAudioRoutes = (_: Services, path: ApiRoutes): Router => {
  const router = Router();
  router.get(
    path,
    wrap(() => Promise.resolve('Get audios')),
  );

  return router;
};
