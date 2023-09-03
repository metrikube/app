import { FindManyOptions, FindOptionsWhere } from 'typeorm';

import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { Credential } from '../../models/credential.model';

export interface CredentialRepository {
  getCredentials(criterias?: FindManyOptions<CredentialEntity> | FindOptionsWhere<CredentialEntity>): Promise<CredentialEntity[]>;

  findCrendentialByPluginId(pluginId: string): Promise<CredentialEntity>;

  createCredential(credential: Credential): Promise<CredentialEntity>;

  findCredentialByIdWithPlugin(id: string): Promise<CredentialEntity>;

  findCredentialByIdAndPluginId(id: string, pluginId: string): Promise<CredentialEntity>;
}
