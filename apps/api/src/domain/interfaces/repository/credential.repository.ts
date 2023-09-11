import { FindManyOptions, FindOptionsWhere } from 'typeorm';

import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { Credential } from '../../models/credential.model';

export interface CredentialRepository {
  getCredentials(criterias?: FindManyOptions<CredentialEntity> | FindOptionsWhere<CredentialEntity>): Promise<Credential[]>;

  findCrendentialByPluginId(pluginId: string): Promise<Credential>;

  createCredential(credential: Partial<Credential>): Promise<Credential>;

  findCredentialByIdWithPlugin(id: string): Promise<Credential>;

  findCredentialByIdAndPluginId(id: string, pluginId: string): Promise<Credential>;
}
