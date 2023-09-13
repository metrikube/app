import { Injectable, Logger } from '@nestjs/common';

import {
  ApiDatabaseLastAverageQueriesByHour,
  ApiDatabaseSize,
  ApiDatabaseSlowQueries,
  DatabaseError,
  DbConnectionCredentialType,
  MetricType,
  PluginConnectionInterface,
  PluginResult
} from '@metrikube/common';

import { InvalidCredentialException } from '../../../../apps/api/src/domain/exceptions/invalid-credential.exception';
import { DbService } from './db.service';

@Injectable()
export class DbAnalyticsPluginService implements PluginConnectionInterface {
  public async getNbQueries(credentialData: DbConnectionCredentialType): Promise<ApiDatabaseLastAverageQueriesByHour | DatabaseError> {
    try {
      const dbService = new DbService(credentialData);
      const nbQueries = await dbService.getNbQueries();
      return nbQueries;
    } catch (error) {
      console.error('Error generated during query execution: ', error);
      return {
        message: `Error raised while get data of database ${credentialData.dbName}: ${error}
        , Check the instructions of this plugin.`,
        error: true
      };
    }
  }

  public async getDbSize(credentialData: DbConnectionCredentialType): Promise<ApiDatabaseSize | DatabaseError> {
    try {
      const dbService = new DbService(credentialData);
      const dbSizeMb = await dbService.aggregateDbSizeData();
      return dbSizeMb;
    } catch (error) {
      console.error('Error executing getDbSizeMb: ', error);
      return {
        message: `Error raised while get data of database ${credentialData.dbName}: ${error}
        , Check the instructions of this plugin.`,
        error: true
      };
    }
  }

  public async getSlowQuery(credentialData: DbConnectionCredentialType): Promise<ApiDatabaseSlowQueries[] | DatabaseError> {
    try {
      const dbService = new DbService(credentialData);
      const slowQueries = await dbService.getSlowQuery();
      return slowQueries.map((slowQuery) => ({
        executionTime: parseFloat(slowQuery.executionTime),
        query: slowQuery.query,
        date: slowQuery.date
      }));
    } catch (error) {
      console.error('Error executing getDbSizeMb: ', error);
      return {
        message: `Error raised while get data of database ${credentialData.dbName}: ${error}
        , Check the instructions of this plugin.`,
        error: true
      };
    }
  }

  async testConnection(credentialData: DbConnectionCredentialType): Promise<{ ok: boolean; message: string | null }> {
    Logger.log(`🏓 Pinging database "${credentialData.dbName}"`, DbAnalyticsPluginService.name);
    try {
      const dbService = new DbService(credentialData);
      const connection = dbService.connection();
      connection.ping();
      return { ok: true, message: null };
    } catch (error) {
      Logger.log(`🏓 Pinging database "${credentialData.dbName}" failed, status: ${(error as Error).message}`, DbAnalyticsPluginService.name);
      throw new InvalidCredentialException(error);
    }
  }

  // prettier-ignore
  describe(type: MetricType): string[] {
    switch (type) {
      default:
        return [];
    }
  }
}
