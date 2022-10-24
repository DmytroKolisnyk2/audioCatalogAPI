import type { ApiRoutes } from '@enums';
import { AudioRoutes } from '@enums';
import { apiPath, wrap } from '@helpers';
import {
  auth,
  JoiValidationMiddleware,
  nonStringAuth,
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
    apiPath(path, AudioRoutes.GET_BY_ID),
    nonStringAuth,
    wrap<Empty, IAudio>(async (req) => audioService.getById(req)),
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
