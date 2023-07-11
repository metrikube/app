import { QueryRunner } from 'typeorm';
import { Logger as LoggerInterface } from 'typeorm/logger/Logger';

import { Logger } from '@nestjs/common';

export class TypeOrmLogger implements LoggerInterface {
  logger: Logger = new Logger(this.constructor.name);

  constructor() {}

  logQuery(query: string, params?: any[], queryRunner?: QueryRunner): any {
    this.logger.log({ query, params });
  }

  logQueryError(error: string | Error, query: string, params?: any[], queryRunner?: QueryRunner) {
    this.logger.log({
      errorMessage: typeof error === 'string' ? error : error?.message,
      query,
      params,
      body: typeof error !== 'string' && error
    });
  }

  logQuerySlow(time: number, query: string, params?: any[], queryRunner?: QueryRunner) {
    this.logger.log({ description: `Slow query (${time} ms)`, query, params });
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner): any {}

  logMigration(message: string, queryRunner?: QueryRunner): any {}

  logSchemaBuild(message: string, queryRunner?: QueryRunner): any {}
}
