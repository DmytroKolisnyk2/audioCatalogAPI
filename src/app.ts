import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { appLogger, errorHandler } from '@middlewares';

dotenv.config();

import './db/config';

const app = express();

app.use(appLogger).use(cors()).use(express.json()).use(errorHandler);

export { app };
