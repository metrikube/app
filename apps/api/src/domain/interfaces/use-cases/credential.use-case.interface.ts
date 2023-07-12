import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { Credential } from '../../models/credential.model';

export interface CredentialUseCaseInterface {
  insertCredentialForPlugin(pluginId: string, credential: Credential): Promise<CredentialEntity>;
  getDataDb(pluginId: string): Promise<string>;
}
