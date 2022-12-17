import 'reflect-metadata';
import 'dotenv/config';
import { createConnection } from 'typeorm';
import express from 'express';
import cors from 'cors';
import config from './ormconfig';
import routes from './routes';

const start = async () => {
  try {
    if (
      !process.env.DATABASE_HOST ||
      !process.env.DATABASE_USERNAME ||
      !process.env.DATABASE_PASSWORD ||
      !process.env.DATABASE_NAME
    ) {
      throw new Error('You need configure env vars');
    }
    await createConnection(config);
  } catch (error) {
    console.log(`Error while connecting to the database! ${error.message}`);
  }
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/sispenf/v1', routes);

  app.listen(process.env.PORT || 3333, () => {
    console.log(
      process.env.DATABASE_HOST,
      process.env.DATABASE_USERNAME,
      process.env.DATABASE_PASSWORD,
      process.env.DATABASE_NAME,
    );
    console.log('Listening on port 3333');
  });
};

start();
