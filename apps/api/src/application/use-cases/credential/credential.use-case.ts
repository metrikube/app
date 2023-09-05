import { Inject, Injectable } from '@nestjs/common';

import { ApiDatabaseLastAverageQueriesByHour, ApiDatabaseSize, ApiDatabaseSlowQueries, GenericCredentialType, Plugin } from '@metrikube/common';
import { DbAnalyticsPluginService } from '@metrikube/db-analytics-plugin';

import { CredentialRepository } from '../../../domain/interfaces/repository/credential.repository';
import { PluginRepository } from '../../../domain/interfaces/repository/plugin.repository';
import { CredentialUseCaseInterface } from '../../../domain/interfaces/use-cases/credential.use-case.interface';
import { PluginUseCaseInterface } from '../../../domain/interfaces/use-cases/plugin.use-case.interface';
import { Credential } from '../../../domain/models/credential.model';
import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { DiTokens } from '../../../infrastructure/di/tokens';

@Injectable()
export class CredentialUseCase implements CredentialUseCaseInterface {
  constructor(
    @Inject(DiTokens.CredentialRepositoryToken) private readonly credentialRepository: CredentialRepository,
    @Inject(DiTokens.DbAnalyticsPluginServiceToken) private readonly DbAnalyticsPluginService: DbAnalyticsPluginService,
    @Inject(DiTokens.PluginUseCaseToken) private readonly pluginUseCase: PluginUseCaseInterface,
    @Inject(DiTokens.PluginRepositoryToken) private readonly pluginRepository: PluginRepository
  ) {}

  async insertCredentialForPlugin(pluginId: Plugin['id'], paylad: Credential): Promise<CredentialEntity> {
    return this.credentialRepository.createCredential({ pluginId, ...paylad });
  }

  async validateCredential(pluginId: string, credential: GenericCredentialType): Promise<void> {
    const plugin = await this.pluginRepository.findOneById(pluginId);
    return this.pluginUseCase.testPluginConnection(plugin, credential);
  }

  async getNbQueries(pluginId: Plugin['id']): Promise<ApiDatabaseLastAverageQueriesByHour> {
    const credentials = await this.credentialRepository.findCrendentialByPluginId(pluginId);
    const credentialValue = JSON.parse(Buffer.from(credentials.value, 'base64').toString('utf-8')) as GenericCredentialType;
    return this.DbAnalyticsPluginService.getNbQueries({
      dbName: credentialValue['dbName'],
      dbHost: credentialValue['dbHost'],
      dbPort: credentialValue['dbPort'],
      dbUsername: credentialValue['dbUser'],
      dbPassword: credentialValue['dbPassword']
    });
  }

  async getDbSize(pluginId: Plugin['id']): Promise<ApiDatabaseSize> {
    const credentials = await this.credentialRepository.findCrendentialByPluginId(pluginId);
    const credentialValue = JSON.parse(Buffer.from(credentials.value, 'base64').toString('utf-8')) as GenericCredentialType;
    return this.DbAnalyticsPluginService.getDbSize({
      dbName: credentialValue['dbName'],
      dbHost: credentialValue['dbHost'],
      dbPort: credentialValue['dbPort'],
      dbUsername: credentialValue['dbUser'],
      dbPassword: credentialValue['dbPassword']
    });
  }

  async getSlowQuery(pluginId: Plugin['id']): Promise<ApiDatabaseSlowQueries[]> {
    const credentials = await this.credentialRepository.findCrendentialByPluginId(pluginId);
    const credentialValue = JSON.parse(Buffer.from(credentials.value, 'base64').toString('utf-8')) as GenericCredentialType;
    return this.DbAnalyticsPluginService.getSlowQuery({
      dbName: credentialValue['dbName'],
      dbHost: credentialValue['dbHost'],
      dbPort: credentialValue['dbPort'],
      dbUsername: credentialValue['dbUser'],
      dbPassword: credentialValue['dbPassword']
    });
  }
}
