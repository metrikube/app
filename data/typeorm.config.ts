import { DataSource } from 'typeorm';

const entititesPath = process.env.NODE_ENV === 'production' ? 'dist-migrations/**/entities/*.entity.js' : 'apps/**/entities/*.entity.ts';
const migrationsPath = process.env.NODE_ENV === 'production' ? 'dist-migrations/**/migrations/*.js' : 'data/**/migrations/*.ts';

export default new DataSource({
  type: 'better-sqlite3',
  database: 'data/db',
  entities: [entititesPath],
  migrationsTableName: '_migrations',
  migrations: [migrationsPath],
  migrationsTransactionMode: 'all'
});
