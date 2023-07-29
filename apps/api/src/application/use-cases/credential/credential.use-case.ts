import { GenericCredentialType, Plugin } from '@metrikube/common';
import { DbAnalyticsPluginService } from '@metrikube/db-analytics-plugin';

import { Inject, Injectable } from '@nestjs/common';

import { CredentialRepository } from '../../../domain/interfaces/repository/credential.repository';
import { CredentialUseCaseInterface } from '../../../domain/interfaces/use-cases/credential.use-case.interface';
import { Credential } from '../../../domain/models/credential.model';
import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';

@Injectable()
export class CredentialUseCase implements CredentialUseCaseInterface {
  constructor(
    @Inject('CREDENTIAL_REPOSITORY') private readonly credentialRepository: CredentialRepository,
    @Inject('DB_ANALYTICS_PLUGIN') private readonly DbAnalyticsPluginService: DbAnalyticsPluginService
  ) {}

  async insertCredentialForPlugin(pluginId: Plugin['id'], paylad: Credential): Promise<CredentialEntity> {
    return this.credentialRepository.createCredential({ pluginId, ...paylad });
  }

  async getDataDb(pluginId: Plugin['id']): Promise<string> {
    const credentials = await this.credentialRepository.findCrendentialByPluginId(pluginId);
    const credentialValue = JSON.parse(Buffer.from(credentials.value, 'base64').toString('utf-8')) as GenericCredentialType;

    return this.DbAnalyticsPluginService.getDataDb({
      dbName: credentialValue['dbName'],
      dbHost: credentialValue['dbHost'],
      dbPort: credentialValue['dbPort'],
      dbUsername: credentialValue['dbUser'],
      dbPassword: credentialValue['dbPassword']
    });
  }
}
