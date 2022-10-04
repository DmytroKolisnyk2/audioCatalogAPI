import { ApiRoutes } from '@enums';
import type { Services } from '@services';
import type { Router } from 'express';
import { initAudioRoutes } from './audio.routes';
import { initAuthRoutes } from './auth.routes';
import { initTestRoutes } from './test.routes';

export const initRoutes = (services: Services): Router[] => [
  initTestRoutes(services, ApiRoutes.TEST),
  initAudioRoutes(services, ApiRoutes.AUDIO),
  initAuthRoutes(services, ApiRoutes.AUTHORIZATION),
];
