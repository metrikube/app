import { ApiMonitoringService } from '@metrikube/api-monitoring';
import { AWSService } from '@metrikube/aws-plugin';
import { ApiEndpointCredentialType, ApiHealthCheckResult, CredentialType, GenericCredentialType, MetricType, PluginResult } from '@metrikube/common';

import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';

import { CredentialRepository } from '../../../domain/interfaces/repository/credential.repository';
import { PluginRepository } from '../../../domain/interfaces/repository/plugin.repository';
import { AlertUseCaseInterface } from '../../../domain/interfaces/use-cases/alert.use-case.interface';
import { PluginUseCaseInterface } from '../../../domain/interfaces/use-cases/plugin.use-case.interface';
import { Alert } from '../../../domain/models/alert.model';
import { Plugin } from '../../../domain/models/plugin.model';
import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity';
import { AlertRepositoryImpl } from '../../../infrastructure/database/repositories/alert.repository';
import { MetricRepositoryImpl } from '../../../infrastructure/database/repositories/metric.repository';

@Injectable()
export class PluginUseCase implements PluginUseCaseInterface {
  constructor(
    @Inject('PLUGIN_REPOSITORY') private readonly pluginRepository: PluginRepository,
    @Inject('CREDENTIAL_REPOSITORY') private readonly credentialRepository: CredentialRepository,
    @Inject('AWS_PLUGIN') private readonly AWSService: AWSService,
    @Inject('ALERT_USE_CASE') private readonly alertUseCase: AlertUseCaseInterface,
    @Inject('ALERT_REPOSITORY') private readonly alertRepository: AlertRepositoryImpl,
    @Inject('METRIC_REPOSITORY') private readonly metricRepository: MetricRepositoryImpl,
    @Inject('API_MONITORING') private readonly apiMonitoringService: ApiMonitoringService
  ) {}

  getPlugins(): Promise<PluginEntity[]> {
    return this.pluginRepository.getPlugins();
  }

  async refreshPluginMetric(pluginId: string, metric: MetricType): Promise<PluginResult<MetricType>> {
    const credentials = await this.credentialRepository.findCrendentialByPluginId(pluginId);
    if (!credentials) throw new BadRequestException('No credentials found for this plugin');

    const pluginMetric = await this.metricRepository.findByPluginIdAndMetricType(pluginId, metric);

    const alert = await this.alertRepository.findOne({ where: { metric: { id: pluginMetric.id } } });

    switch (metric) {
      case 'api_endpoint_health_check': {
        const result: ApiHealthCheckResult = await this.apiMonitoringService.apiHealthCheck({
          apiEndpoint: (JSON.parse(Buffer.from(credentials.value, 'base64').toString('utf-8')) as ApiEndpointCredentialType).apiEndpoint
        });
        await this.alertUseCase.checkContiditionAndNotify(result, alert); // todo : send to event emitter
        return result;
      }
      default:
        return {} as PluginResult<MetricType>;
    }
  }

  getPluginCredentials(pluginId: string): Promise<CredentialEntity> {
    return this.credentialRepository.findCrendentialByPluginId(pluginId);
  }

  async create(plugin: Plugin): Promise<PluginEntity> {
    return this.pluginRepository.createPlugin(plugin);
  }

  getAWSPlugin() {
    return this.AWSService;
  }
}
