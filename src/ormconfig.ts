import path from 'path';
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  host: process.env.DATABASE_HOST,
  port: 5432,
  type: 'postgres',
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    path.join(__dirname, 'entities/**/*.entity.ts'),
    path.join(__dirname, '**/*.entity.js'),
  ],
  migrations: ['./src/migrations/**.ts'],
  cli: {
    migrationsDir: './src/migrations',
  },
  subscribers: ['src/subscriber/**/*.ts'],
  synchronize: true,
  ssl: { rejectUnauthorized: false },
};

export default config;
