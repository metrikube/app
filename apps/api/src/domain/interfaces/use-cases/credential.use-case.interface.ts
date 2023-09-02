import { Connection } from 'mysql2/promise';

import { ApiDatabaseLastAverageQueriesByHour, ApiDatabaseSize, ApiDatabaseSlowQueries } from '@metrikube/common';

import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { Credential } from '../../models/credential.model';

export interface CredentialUseCaseInterface {
  insertCredentialForPlugin(pluginId: string, credential: Credential): Promise<CredentialEntity>;
  getNbQueries(pluginId: string): Promise<ApiDatabaseLastAverageQueriesByHour>;
  getDbSize(pluginId: string): Promise<ApiDatabaseSize>;
  getSlowQuery(pluginId: string): Promise<ApiDatabaseSlowQueries[]>;
}
