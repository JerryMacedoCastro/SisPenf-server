import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import AppDataSource from './ormconfig';
import routes from './routes';

const start = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('You need configure env vars');
    }
    await AppDataSource.initialize();
    if (AppDataSource.isInitialized) {
      console.log('Database conected...');
    } else {
      throw new Error('AppDataSource.isInitialized returned false');
    }
  } catch (error) {
    console.log(`Error while connecting to the database! ${error.message}`);
  }
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/sispenf/v1', routes);

  app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT);
  });
};

start();
