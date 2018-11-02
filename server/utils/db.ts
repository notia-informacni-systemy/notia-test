import * as KnexLib from 'knex';
import { DbConfig } from '../config/db-config';

export const Knex = KnexLib({
  client: DbConfig.DB.TYPE,
  useNullAsDefault: true,
  connection: {
    host: DbConfig.DB.HOST,
    port: DbConfig.DB.PORT,
    database: DbConfig.DB.DATABASE,
    user: DbConfig.DB.USER,
    password: DbConfig.DB.PASSWORD
  }
});
