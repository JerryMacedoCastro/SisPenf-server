"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const config = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [
        path_1.default.join(__dirname, '**/*.entity.ts'),
        path_1.default.join(__dirname, '**/*.entity.js'),
    ],
    migrations: ['./src/migrations/**.ts'],
    cli: {
        migrationsDir: './src/migrations',
    },
    subscribers: ['src/subscriber/**/*.ts'],
    synchronize: true,
    ssl: { rejectUnauthorized: false },
};
exports.default = config;
