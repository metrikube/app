import { FindManyOptions, FindOptionsWhere } from 'typeorm';

import { CredentialRepository } from '../../../domain/interfaces/repository/credential.repository';
import { Credential } from '../../../domain/models/credential.model';
import { CredentialEntity } from '../entities/credential.entity';

export class CredentialInMemoryRepositoryImpl implements CredentialRepository {
  credentials: Credential[] = [];

  constructor() {}

  findCredentialByIdAndPluginId(id: string, pluginId: string): Promise<Credential> {
    return Promise.resolve(this.credentials.find((credential) => credential.id === id && credential.pluginId === pluginId));
  }

  createCredential(credential: any): Promise<Credential> {
    const credentialToInsert = {
      id: '1',
      pluginId: credential.pluginId,
      type: credential.type,
      value: credential.value
    } as Credential;
    this.credentials.push(credentialToInsert);
    return Promise.resolve(credentialToInsert as Credential);
  }

  findCredentialByIdWithPlugin(id: string): Promise<Credential> {
    return Promise.resolve(this.credentials.find((credential) => credential.id === id));
  }

  findCrendentialByPluginId(pluginId: string): Promise<Credential> {
    return Promise.resolve(this.credentials.find((credential) => credential.pluginId === pluginId));
  }

  getCredentials(criterias?: FindManyOptions<CredentialEntity> | FindOptionsWhere<CredentialEntity>): Promise<Credential[]> {
    return Promise.resolve(this.credentials);
  }
}
