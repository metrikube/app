import { ApiEndpointCredentialType, DbConnectionCredentialType, PluginConnectionInterface, ApiDatabaseSize, ApiDatabaseSlowQueries, ApiDatabaseLastAverageQueriesByHour } from '@metrikube/common';
import { DbService } from './db.service'
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import type { AxiosError } from 'axios';

@Injectable()
export class DbAnalyticsPluginService implements PluginConnectionInterface {

  public async getNbQueries(credentialData: DbConnectionCredentialType): Promise<ApiDatabaseLastAverageQueriesByHour> {
    try {
      const dbService = await new DbService(credentialData);
      return dbService.getNbQueriesPerSec();
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

  public async getSlowQuery(credentialData: DbConnectionCredentialType): Promise<ApiDatabaseSlowQueries> {
    try {
      const dbService = await new DbService(credentialData);
      const slowQuery = await dbService.getSlowQuery();
      const currentDate = new Date();

      return {
        executionTime: slowQuery.executionTime,
        query: slowQuery.query,
        date: currentDate.toISOString()
      };
    } catch (error) {
      console.error('Error executing getDbSizeMb: ', error);
      throw error;
    }
  }

  async testConnection(credentialData: DbConnectionCredentialType): Promise<{ ok: boolean; message: string | null }> {
    Logger.log(`🏓 Pinging database "${credentialData.dbName}"`, DbAnalyticsPluginService.name);
    const dbService = await new DbService(credentialData);
    try {
      const connection = await dbService.connection();
      await connection.ping();
      return {
        ok: true,
        message: null
      };
    } catch (error) {
      Logger.log(`🏓 Pinging database "${credentialData.dbName}" failed, status: ${error}`, DbAnalyticsPluginService.name);
      return {
        ok: false,
        message: error || null
      };
    }
  }
}


