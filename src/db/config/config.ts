import mongoose from 'mongoose';

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => console.log('Database connected successfully'))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
