import { Connection } from 'mysql2/promise';
import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { Credential } from '../../models/credential.model';

export interface CredentialUseCaseInterface {
  insertCredentialForPlugin(pluginId: string, credential: Credential): Promise<CredentialEntity>;
  getNbQueries(pluginId: string): Promise<string>;
  getDbSize(pluginId: string): Promise<string>;
  getSlowQuery(pluginId: string): Promise<string>;



}
