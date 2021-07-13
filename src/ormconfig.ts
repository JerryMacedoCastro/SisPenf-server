import path from 'path';
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
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
