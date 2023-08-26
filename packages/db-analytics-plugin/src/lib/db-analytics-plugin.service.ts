import { ApiEndpointCredentialType, DbConnectionCredentialType, PluginConnectionInterface, DbConnectionType, ApiDatabaseSize, ApiDatabaseSlowQueries, ApiDatabaseLastAverageQueriesByHour } from '@metrikube/common';
import { DbService } from './db.service'
import * as mysql from 'mysql2';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import type { AxiosError } from 'axios';

@Injectable()
export class DbAnalyticsPluginService implements PluginConnectionInterface {
  constructor() {}

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

  async testConnection(credential: ApiEndpointCredentialType): Promise<{ ok: boolean; message: string | null }> {
    Logger.log(`🏓 Pinging "${credential.apiEndpoint}"`, DbAnalyticsPluginService.name);
    try {
      await axios.get(credential.apiEndpoint);
      return {
        ok: true,
        message: null
      };
    } catch (error) {
      Logger.log(`🏓 Pinging "${credential.apiEndpoint}" failed, status: ${(error as AxiosError)?.status}`, DbAnalyticsPluginService.name);
      return {
        ok: [HttpStatus.NOT_FOUND, HttpStatus.UNAUTHORIZED, HttpStatus.INTERNAL_SERVER_ERROR].includes((error as AxiosError)?.status as HttpStatus),
        message: (error as AxiosError)?.message || null
      };
    }
  }
}


