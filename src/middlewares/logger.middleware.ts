import logger from 'morgan';

const formatsLogger = process.env.NODE_ENV === 'development' ? 'dev' : 'short';

export const appLogger = logger(formatsLogger);
