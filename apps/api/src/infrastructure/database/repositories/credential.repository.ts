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

  createCredential(credential: Credential): Promise<CredentialEntity> {
    const encodedValue = Buffer.from(JSON.stringify(credential.value)).toString('base64');
    return this.save({ ...credential, value: encodedValue });
  }

  getCredentials(): Promise<CredentialEntity[]> {
    return this.find();
  }

  findCredentialByIdWithPlugin(id: string): Promise<CredentialEntity> {
    return this.findOneOrFail({
      where: { id },
      relations: { plugin: true }
    });
  }

  findCrendentialByPluginId(pluginId: string): Promise<CredentialEntity> {
    return this.findOneOrFail({
      where: { plugin: { id: pluginId } },
      relations: { plugin: true }
    });
  }
}
