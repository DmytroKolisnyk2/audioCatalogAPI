import express from 'express';
import cors from 'cors';
import { appLogger, errorHandler, localizationMiddleware } from '@middlewares';
import './utils/dotenv';
import './db/config';
import { initRoutes } from '@routes';
import { initServices } from '@services';
import { initRepositories } from '@repositories';
import swagger from 'swagger-ui-express';
import swaggerDocs from './docs/api.json';
import './db/config/jwtStrategy';

const app = express();
const repositories = initRepositories();
const services = initServices(repositories);
const routes = initRoutes(services);

app
  .use(appLogger)
  .use(cors())
  .use(express.json())
  .use(localizationMiddleware)
  .use(routes)
  .use('/docs', swagger.serve, swagger.setup(swaggerDocs))
  .use(errorHandler);

export { app };
