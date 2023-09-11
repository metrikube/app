import { Inject, Injectable } from '@nestjs/common';

import { ApiDatabaseLastAverageQueriesByHour, ApiDatabaseSize, ApiDatabaseSlowQueries, GenericCredentialType, Plugin } from '@metrikube/common';
import { DbAnalyticsPluginService } from '@metrikube/db-analytics-plugin';

import { CredentialRepository } from '../../../domain/interfaces/repository/credential.repository';
import { MetricRepository } from '../../../domain/interfaces/repository/metric.repository';
import { CredentialUseCaseInterface } from '../../../domain/interfaces/use-cases/credential.use-case.interface';
import { PluginUseCaseInterface } from '../../../domain/interfaces/use-cases/plugin.use-case.interface';
import { Credential } from '../../../domain/models/credential.model';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { CredentialTypesDtos, ValidateCredentialResponseDto } from '../../../presenter/credential/dtos/validate-credential-response.dto';

@Injectable()
export class CredentialUseCase implements CredentialUseCaseInterface {
  constructor(
    @Inject(DiTokens.CredentialRepositoryToken) private readonly credentialRepository: CredentialRepository,
    @Inject(DiTokens.DbAnalyticsPluginServiceToken) private readonly DbAnalyticsPluginService: DbAnalyticsPluginService,
    @Inject(DiTokens.PluginUseCaseToken) private readonly pluginUseCase: PluginUseCaseInterface,
    @Inject(DiTokens.MetricRepositoryToken) private readonly metricRepository: MetricRepository
  ) {}

  async insertCredentialForPlugin(pluginId: Plugin['id'], paylad: Credential): Promise<Credential> {
    return this.credentialRepository.createCredential({ pluginId, ...paylad });
  }

  async validateCredential(metricId: string, credential: CredentialTypesDtos): Promise<ValidateCredentialResponseDto> {
    const metric = await this.metricRepository.findById(metricId);

    await this.pluginUseCase.testPluginConnection(metric.plugin, credential);

    const dataSample = metric.isNotifiable ? await this.pluginUseCase.fetchMetricDataSampleWithCredential(metricId, credential) : null;

    return new ValidateCredentialResponseDto(metric.pluginId, dataSample);
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
