import type { ApiRoutes } from '@enums';
import { wrap } from '@helpers';
import {
  auth,
  JoiValidationMiddleware,
  parseGenresMiddleware,
  uploadAudioFilesMiddleware,
} from '@middlewares';
import type { Services } from '@services';
import type { IAudio } from '@types';
import { Router } from 'express';
import { audioSchema } from 'validation/audio.schema';

export const initAudioRoutes = (
  { audioService }: Services,
  path: ApiRoutes,
): Router => {
  const router = Router();
  router.get(
    path,
    wrap(() => Promise.resolve('Get audios')),
  );
  router.post(
    path,
    auth,
    uploadAudioFilesMiddleware,
    parseGenresMiddleware,
    JoiValidationMiddleware(audioSchema),
    wrap<Empty, IAudio>(async (req) => audioService.create(req)),
  );

  return router;
};
