import { ApiRoutes } from '@enums';
import type { Services } from '@services';
import type { Router } from 'express';
import { initAudioRoutes } from './audio.routes';
import { initAuthRoutes } from './auth.routes';
import { initUsersRoutes } from './users.routes';

export const initRoutes = (services: Services): Router[] => [
  initAudioRoutes(services, ApiRoutes.AUDIO),
  initAuthRoutes(services, ApiRoutes.AUTHORIZATION),
  initUsersRoutes(services, ApiRoutes.USERS),
];
