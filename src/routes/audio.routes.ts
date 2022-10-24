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
    path,
    wrap<Empty, IAudio[]>(() => audioService.getAudios()),
  );
  router.get(
    apiPath(path, AudioRoutes.AUDIOS_NEW),
    wrap<Empty, IAudio[]>(() => audioService.getNew()),
  );
  router.get(
    apiPath(path, AudioRoutes.AUDIOS_TOP),
    wrap<Empty, IAudio[]>(() => audioService.getTop()),
  );
  router.get(
    apiPath(path, AudioRoutes.GET_BY_ID),
    nonStringAuth,
    wrap<Empty, IAudio>((req) => audioService.getById(req)),
  );
  router.post(
    path,
    auth,
    uploadAudioFilesMiddleware,
    parseGenresMiddleware,
    JoiValidationMiddleware(audioSchema),
    wrap<Empty, IAudio>((req) => audioService.create(req)),
  );

  router.patch(
    apiPath(path, AudioRoutes.LIKE),
    auth,
    wrap<Empty, IAudio>((req) => audioService.updateLike(req)),
  );

  return router;
};
