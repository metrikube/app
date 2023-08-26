import { ApiEndpointCredentialType, DbConnectionCredentialType, PluginConnectionInterface, DbConnectionType } from '@metrikube/common';
import { DbService } from './db.service'
import * as mysql from 'mysql2';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import type { AxiosError } from 'axios';

@Injectable()
export class DbAnalyticsPluginService implements PluginConnectionInterface {
  constructor() {}

  public async getNbQueries(credentialData: DbConnectionCredentialType): Promise<any> {
    try {
      const dbService = await new DbService(credentialData);
      const results = await dbService.getNbQueriesPerSec();
      return { nbQueriesPerHour: results * 3600};
      } catch (error) {
      console.error('Error generated during query execution: ', error);
      throw error;
    }
  }

  public async getDbSize(credentialData: DbConnectionCredentialType): Promise<any> {
    try {
      const dbService = await new DbService(credentialData);
      const dbSizeMb = await dbService.getDbSizeMb();
      const nbRows = await dbService.getNbRows();

      return {dbSizeMb: dbSizeMb, nbRows: nbRows};
    } catch (error) {
      console.error('Error executing getDbSizeMb: ', error);
      throw error;
    }
  }

  public async getSlowQuery(credentialData: DbConnectionCredentialType): Promise<any> {
    try {
      const dbService = await new DbService(credentialData);
      const slowQuery = await dbService.getSlowQuery();
      return {
        slowQuery: slowQuery.avg_execution_time_seconds,
        queryTime: slowQuery.query_text};
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


