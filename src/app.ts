import express from 'express';
import cors from 'cors';
import { appLogger, errorHandler, localizationMiddleware } from '@middlewares';
import './utils/dotenv';
import './db/config';
import { initRoutes } from '@routes';
import { initServices } from '@services';
import { initRepositories } from '@repositories';

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
  .use(errorHandler);

export { app };
