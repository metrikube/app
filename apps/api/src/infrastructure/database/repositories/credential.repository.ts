import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { CredentialRepository } from '../../../domain/interfaces/repository/credential.repository';
import { Credential } from '../../../domain/models/credential.model';
import { CredentialEntity } from '../entities/credential.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class CredentialRepositoryImpl extends BaseRepository<CredentialEntity> implements CredentialRepository {
  constructor(@InjectDataSource() connection: DataSource) {
    super(connection, CredentialEntity);
  }

  async createCredential(credential: Credential): Promise<Credential> {
    const insertedCredential = await this.save({ ...credential });
    return CredentialEntity.toModel(insertedCredential);
  }

  async getCredentials(): Promise<Credential[]> {
    const credentials = await this.find();
    return credentials.length && credentials.map(CredentialEntity.toModel);
  }

  async findCredentialByIdWithPlugin(id: string): Promise<Credential> {
    const credentialEntity = await this.findOneOrFail({
      where: { id },
      relations: { plugin: true }
    });
    return CredentialEntity.toModelDetailed(credentialEntity);
  }

  async findCredentialByIdAndPluginId(id: string, pluginId: string): Promise<Credential> {
    const credentialEntity = await this.findOneOrFail({
      where: { id, plugin: { id: pluginId } },
      relations: { plugin: true }
    });
    return CredentialEntity.toModelDetailed(credentialEntity);
  }

  async findCrendentialByPluginId(pluginId: string): Promise<Credential> {
    const credentialEntity = await this.findOneOrFail({
      where: { plugin: { id: pluginId } },
      relations: { plugin: true }
    });
    return CredentialEntity.toModelDetailed(credentialEntity);
  }
}
