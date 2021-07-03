import path from 'path';
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    path.join(__dirname, '**/*.entity.ts'),
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
