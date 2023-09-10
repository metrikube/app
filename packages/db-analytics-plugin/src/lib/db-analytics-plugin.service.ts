import { Injectable, Logger } from '@nestjs/common';

import { ApiDatabaseLastAverageQueriesByHour, ApiDatabaseSize, ApiDatabaseSlowQueries, DbConnectionCredentialType, MetricType, PluginConnectionInterface, PluginResult } from '@metrikube/common';

import { DbService } from './db.service';

@Injectable()
export class DbAnalyticsPluginService implements PluginConnectionInterface {
  public async getNbQueries(credentialData: DbConnectionCredentialType): Promise<ApiDatabaseLastAverageQueriesByHour> {
    try {
      const dbService = await new DbService(credentialData);
      return dbService.getNbQueries();
    } catch (error) {
      console.error('Error generated during query execution: ', error);
      throw error;
    }
  }

  public async getDbSize(credentialData: DbConnectionCredentialType): Promise<ApiDatabaseSize> {
    try {
      const dbService = await new DbService(credentialData);

      const dbSizeMb = await dbService.getDbSizeMb();
      const nbRows = await dbService.getNbRows();
      const nbTables = await dbService.getNbTables();

      return {
        size: dbSizeMb,
        numberOfTables: nbTables,
        numberOfTotalRows: nbRows,
        databaseName: credentialData.dbName
      };
    } catch (error) {
      console.error('Error executing getDbSizeMb: ', error);
      throw error;
    }
  }

  public async getSlowQuery(credentialData: DbConnectionCredentialType): Promise<ApiDatabaseSlowQueries[]> {
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
      throw error;
    }
  }

  async testConnection(credentialData: DbConnectionCredentialType): Promise<{ ok: boolean; message: string | null }> {
    Logger.log(`🏓 Pinging database "${credentialData.dbName}"`, DbAnalyticsPluginService.name);
    try {
      const dbService = new DbService(credentialData);
      const connection = dbService.connection();
      connection.ping();
      return {
        ok: true,
        message: null
      };
    } catch (error) {
      Logger.log(`🏓 Pinging database "${credentialData.dbName}" failed, status: ${(error as Error).message}`, DbAnalyticsPluginService.name);
      return {
        ok: false,
        message: `db connection failed : ${(error as Error).message}` || null
      };
    }
  }

  // prettier-ignore
  describe(type: MetricType): (
    | keyof PluginResult<'database-queries'>[number]['queries'][number]
    | keyof PluginResult<'database-size'>
    | keyof PluginResult<'database-slow-queries'>[number]
  )[] {
    switch (type) {
      case 'database-queries':
        return ['nbRequests'];
      case 'database-slow-queries':
        return ['executionTime'];
      default:
        return [];
    }
  }
}
