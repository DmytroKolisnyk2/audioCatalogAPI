import type { ApiRoutes } from '@enums';
import { TestRoutes } from '@enums';
import { apiPath, wrap } from '@helpers';
// import { JoiValidationMiddleware } from '@middlewares';
import type { Services } from '@services';
// import { testSchema } from '@validation';
import type { Request } from 'express';
import { Router } from 'express';

export const initTestRoutes = (
  { testService }: Services,
  path: ApiRoutes,
): Router => {
  const router = Router();
  router.get(
    apiPath(path, TestRoutes.GREETING),
    wrap((req: Request) => testService.getLocalizedGreeting(req.t)),
  );
  router.get(
    path,
    wrap(() => testService.getMessages()),
  );

  router.post(
    path,
    // JoiValidationMiddleware(testSchema(req.t)),
    wrap((req: Request) => testService.addMessage(req.body)),
  );

  return router;
};
