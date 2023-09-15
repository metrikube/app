import { Injectable, Logger } from '@nestjs/common';

import { ApiDatabaseLastAverageQueriesByHour, ApiDatabaseSize, ApiDatabaseSlowQueries, DatabaseError, DbConnectionCredentialType, MetricType, PluginConnectionInterface } from '@metrikube/common';

import { InvalidCredentialException } from '../../../../apps/api/src/domain/exceptions/invalid-credential.exception';
import { DbService } from './db.service';

@Injectable()
export class DbAnalyticsPluginService implements PluginConnectionInterface {
  constructor() {}

  public async getNbQueries(credentialData: DbConnectionCredentialType): Promise<ApiDatabaseLastAverageQueriesByHour | DatabaseError> {
    try {
      const dbService = new DbService(credentialData);
      const connection = await dbService.connection();
      const nbQueries = await dbService.getNbQueries(connection);
      return nbQueries;
    } catch (error) {
      Logger.error(`Error executing getNbQueries: ${(error as Error).message}`, DbAnalyticsPluginService.name);
      return {
        message: `Error raised while get data of database ${credentialData.dbName}: ${(error as Error).message}, Check the instructions of this plugin.`,
        error: true
      };
    }
  }

  public async getDbSize(credentialData: DbConnectionCredentialType): Promise<ApiDatabaseSize | DatabaseError> {
    try {
      const dbService = new DbService(credentialData);
      const connection = await dbService.connection();
      const dbSizeMb = await dbService.aggregateDbSizeData(connection);
      return dbSizeMb;
    } catch (error) {
      Logger.error(`Error executing getDbSize: ${(error as Error).message}`, DbAnalyticsPluginService.name);
      return {
        message: `Error raised while get data of database ${credentialData.dbName}: ${(error as Error).message}, Check the instructions of this plugin.`,
        error: true
      };
    }
  }

  public async getSlowQuery(credentialData: DbConnectionCredentialType): Promise<ApiDatabaseSlowQueries[] | DatabaseError> {
    try {
      const dbService = new DbService(credentialData);
      const connection = await dbService.connection();
      const slowQueries = await dbService.getSlowQuery(connection);
      return slowQueries.map((slowQuery) => ({
        executionTime: parseFloat(slowQuery.executionTime),
        query: slowQuery.query,
        date: slowQuery.date
      }));
    } catch (error) {
      Logger.error(`Error executing getSlowQuery: ${(error as Error).message}`, DbAnalyticsPluginService.name);
      return {
        message: `Error raised while get data of database ${credentialData.dbName}: ${(error as Error).message}, Check the instructions of this plugin.`,
        error: true
      };
    }
  }

  async testConnection(credentialData: DbConnectionCredentialType): Promise<{ ok: boolean; message: string | null }> {
    try {
      Logger.log(`🏓 Pinging database "${credentialData.dbName}"`, DbAnalyticsPluginService.name);
      const dbService = new DbService(credentialData);
      const connection = await dbService.connection();
      await connection.ping();
      return { ok: true, message: null };
    } catch (error) {
      Logger.error(`🏓 Pinging database "${credentialData.dbName}" failed, status: ${(error as Error).message}`, DbAnalyticsPluginService.name);
      throw new InvalidCredentialException(error);
    }
  }

  // prettier-ignore
  describe(type: MetricType): (
    | keyof ApiDatabaseLastAverageQueriesByHour["queries"][number]
    | keyof ApiDatabaseSlowQueries
    )[] {
    switch (type) {
      case "database-queries":
        return ["nbRequests"];
      case "database-slow-queries":
        return ["executionTime"];
      default:
        return [];
    }
  }
}
