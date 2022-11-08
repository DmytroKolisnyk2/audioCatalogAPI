import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { appLogger, errorHandler, localizationMiddleware } from '@middlewares';
import './utils/dotenv';
import './db/config';
import { initRoutes } from '@routes';
import { initServices } from '@services';
import { initRepositories } from '@repositories';
import swagger from 'swagger-ui-express';
import { ApiRoutes } from '@enums';
import swaggerDocs from './docs/api.json';
import './db/config/jwtStrategy';

const app = express();
const repositories = initRepositories();
const services = initServices(repositories);
const routes = initRoutes(services);

app
  .use(helmet())
  .use(appLogger)
  .use(cors())
  .use(express.json())
  .use(localizationMiddleware)
  .use(ApiRoutes.API, routes)
  .use(ApiRoutes.DOCS, swagger.serve, swagger.setup(swaggerDocs))
  .use(errorHandler);

export { app };
