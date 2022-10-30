import type { ApiRoutes } from '@enums';
import { UsersRoutes } from '@enums';
import { apiPath, wrap } from '@helpers';
import { JoiValidationMiddleware, auth } from '@middlewares';
import type { Services } from '@services';
import { Router } from 'express';
import { profileSchema } from '@validation';

export const initUsersRoutes = (
  { usersService, profileService }: Services,
  path: ApiRoutes,
): Router => {
  const router = Router();
  router.get(
    apiPath(path, UsersRoutes.BY_ID),
    wrap((req) => usersService.getUserById(req)),
  );
  router.put(
    apiPath(path, UsersRoutes.BY_ID),
    auth,
    JoiValidationMiddleware(profileSchema),
    wrap((req) => usersService.updateProfile(req)),
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
  router.patch(
    apiPath(path, UsersRoutes.FOLLOW),
    auth,
    wrap((req) => usersService.updateFollow(req)),
  );

  router.patch(
    apiPath(path, UsersRoutes.PROFILE_BANNER),
    auth,
    wrap((req) => profileService.updateBanner(req)),
  );

  router.patch(
    apiPath(path, UsersRoutes.PROFILE_AVATAR),
    auth,
    wrap((req) => profileService.updateAvatar(req)),
  );

  return router;
};
