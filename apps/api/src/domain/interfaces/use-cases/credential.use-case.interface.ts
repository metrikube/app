import { Connection } from 'mysql2/promise';
import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { Credential } from '../../models/credential.model';
import { ApiDatabaseSize, ApiDatabaseSlowQueries, ApiDatabaseLastAverageQueriesByHour } from '@metrikube/common';


export interface CredentialUseCaseInterface {
  insertCredentialForPlugin(pluginId: string, credential: Credential): Promise<CredentialEntity>;
  getNbQueries(pluginId: string): Promise<ApiDatabaseLastAverageQueriesByHour>;
  getDbSize(pluginId: string): Promise<ApiDatabaseSize>;
  getSlowQuery(pluginId: string): Promise<ApiDatabaseSlowQueries>;



}
