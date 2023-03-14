import path from 'path';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  port: 5432,
  url: process.env.DATABASE_URL,
  type: 'postgres',
  entities: [
    path.join(__dirname, 'entities/**/*.entity.ts'),
    path.join(__dirname, '**/*.entity.js'),
  ],
  migrations: ['./src/migrations/**.ts'],

  subscribers: ['src/subscriber/**/*.ts'],
  synchronize: true,
  ssl: { rejectUnauthorized: false },
});

export default AppDataSource;
