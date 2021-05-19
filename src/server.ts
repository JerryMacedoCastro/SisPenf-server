import 'reflect-metadata';
import 'dotenv/config';
import { createConnection } from 'typeorm';
import config from './ormconfig';
import express from 'express';
import routes from './routes';
import path from 'path';

const start = async () => {
  try {
    await createConnection(config);
  } catch (error) {
    console.log(`Error while connecting to the database! ${error.message}`);
  }
  const app = express();
  app.use(express.json());
  app.use(routes);

  app.listen(3333, () => {
    // eslint-disable-next-line no-console
    console.log('Listening on port 3333');
  });
};

start();
