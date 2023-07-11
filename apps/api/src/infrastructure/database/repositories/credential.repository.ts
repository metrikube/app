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
    return this.save(credential);
  }

  getCredentials(): Promise<CredentialEntity[]> {
    return this.find();
  }

  getCredentialsByType(type: string): Promise<CredentialEntity> {
    return this.findOneOrFail({
      where: { type },
      relations: { plugin: true }
    });
  }


  findCredentialByIdWithPlugin(id: string): Promise<CredentialEntity> {
    return this.findOneOrFail({
      where: { id },
      relations: { plugin: true }
    });
  }

}
