import { DataSource, DataSourceOptions } from 'typeorm';
import * as process from 'node:process';
import * as dotenv from 'dotenv';
import { User } from '../core/user/entities';
import { Transaction } from '../core/transaction/entities';
import { Category } from '../core/category/entities';
import { Account } from '../core/account/entities';
import migrations from '../migrations';

dotenv.config();
const entities = [User, Transaction, Category, Account];

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
  migrations,
  ssl: process.env.ENV === 'prod' ? { rejectUnauthorized: false } : false,
};

export default new DataSource(dbConfig);
