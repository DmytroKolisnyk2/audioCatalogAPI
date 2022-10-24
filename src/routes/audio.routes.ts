import { ApiRoutes, AudioRoutes } from '@enums';
import { apiPath, wrap } from '@helpers';
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
    wrap<Empty, IAudio[]>(async () => audioService.getAudios()),
  );
  router.get(
    apiPath(path, AudioRoutes.AUDIOS_NEW),
    wrap<Empty, IAudio[]>(async () => audioService.getNew()),
  );
  router.get(
    apiPath(path, AudioRoutes.AUDIOS_TOP),
    wrap<Empty, IAudio[]>(async () => audioService.getTop()),
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
