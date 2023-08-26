import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'better-sqlite3',
  database: 'data/db',
  entities: ['apps/**/entities/*.entity.ts'],
  migrationsTableName: '_migrations',
  migrations: ['data/migrations/*.ts'],
  migrationsTransactionMode: 'all',
  migrationsRun: true
});
