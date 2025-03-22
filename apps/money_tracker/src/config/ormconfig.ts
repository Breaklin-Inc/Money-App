import { DataSourceOptions } from 'typeorm';
import * as process from 'node:process';
import * as dotenv from "dotenv";

dotenv.config();
const entities = [];

export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities,
  migrationsRun: false,
  synchronize: false,
  logging: false,
  ssl: process.env.ENV === 'prod' ? { rejectUnauthorized: false } : false,
};
