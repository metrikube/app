import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'better-sqlite3',
  database: 'data/db',
  entities: ['dist-migrations/**/entities/*.entity.js', 'apps/**/entities/*.entity.ts'],
  migrationsTableName: '_migrations',
  migrations: ['dist-migrations/**/migrations/*.js', 'data/**/migrations/*.ts'],
  migrationsTransactionMode: 'all'
});
