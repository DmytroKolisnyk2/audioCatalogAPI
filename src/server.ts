import { gracefulShutdown } from '@utils';
import { app } from './app';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`process id: ${process.pid}`);
  console.log(`Server running. Use our API on port: ${PORT}`);
});

process.on('SIGTERM', (process) => {
  new gracefulShutdown(process, server).shutdown();
});
process.on('SIGINT', (process) => {
  new gracefulShutdown(process, server).shutdown();
});
