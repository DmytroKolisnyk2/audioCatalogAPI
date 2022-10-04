import mongoose from 'mongoose';
import type http from 'http';

const gracefulShutdown = async (
  signal: string,
  server: http.Server,
): Promise<undefined> => {
  console.log('\x1b[32m', `${signal} signal received.`);
  server.close(() => {
    console.log('\x1b[31m', 'Http server closed.');
  });
  await mongoose.connection
    .close()
    .then(() => console.log('\x1b[31m', 'Database connection closed.'));
  console.log('\x1b[0m', `${signal} successfully completed`);

  process.exit(0);
};

export { gracefulShutdown };
