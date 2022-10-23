import type { ApiRoutes } from '@enums';
import { UsersRoutes } from '@enums';
import { apiPath, wrap } from '@helpers';
import type { Services } from '@services';
import { Router } from 'express';

export const initUsersRoutes = (
  { usersService }: Services,
  path: ApiRoutes,
): Router => {
  const router = Router();
  router.get(
    apiPath(path, UsersRoutes.BY_ID),
    wrap((req) => usersService.getUserById(req)),
  );
  router.get(
    apiPath(path, UsersRoutes.AUDIOS),
    wrap((req) => usersService.getUserAudios(req)),
  );
  router.get(
    apiPath(path, UsersRoutes.FOLLOWERS),
    wrap((req) => usersService.getUserFollowers(req)),
  );
  router.get(
    apiPath(path, UsersRoutes.FOLLOWING),
    wrap((req) => usersService.getUserFollowing(req)),
  );
  router.get(
    apiPath(path, UsersRoutes.HISTORY),
    wrap((req) => usersService.getUserHistoryAudios(req)),
  );
  router.get(
    apiPath(path, UsersRoutes.LIKES),
    wrap((req) => usersService.getUserLikedAudios(req)),
  );

  return router;
};
