import { ApiMonitoringService } from '@metrikube/api-monitoring';
import { AWSService } from '@metrikube/aws-plugin';
import { ApiEndpointCredentialType, ApiHealthCheckResult, CredentialType, GenericCredentialType, MetricType, PluginResult } from '@metrikube/common';
import { IsNull, Not } from 'typeorm';

import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';

import { CredentialRepository } from '../../../domain/interfaces/repository/credential.repository';
import { MetricRepository } from '../../../domain/interfaces/repository/metric.repository';
import { PluginRepository } from '../../../domain/interfaces/repository/plugin.repository';
import { AlertUseCaseInterface } from '../../../domain/interfaces/use-cases/alert.use-case.interface';
import { PluginUseCaseInterface } from '../../../domain/interfaces/use-cases/plugin.use-case.interface';
import { Alert } from '../../../domain/models/alert.model';
import { Credential } from '../../../domain/models/credential.model';
import { Metric } from '../../../domain/models/metric.model';
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
    @Inject('METRIC_REPOSITORY') private readonly metricRepository: MetricRepository,
    @Inject('API_MONITORING') private readonly apiMonitoringService: ApiMonitoringService
  ) {}

  async getPlugins(): Promise<Plugin[]> {
    try {
      const plugins = await this.pluginRepository.getPlugins({});
      const metrics = await this.metricRepository.getMetrics({});
      const credentials = await this.credentialRepository.getCredentials({ where: { pluginId: Not(IsNull()) } });

      return plugins.map((plugin) => ({
        ...plugin,
        credentials: this.mapToPluginCredential(credentials.find((credential) => credential.pluginId === plugin.id)),
        metrics: metrics
          .filter((metric) => metric.pluginId === plugin.id)
          .map((metric) => ({
            id: metric.id,
            type: metric.type,
            name: metric.name,
            createdAt: metric.createdAt
          })) as Metric[]
      }));
    } catch (e) {
      Logger.error(e);
      throw new Error('Error while fetching plugins');
    }
  }

  async refreshPluginMetric(pluginId: string, metricType: MetricType): Promise<PluginResult<MetricType>> {
    const credentials = await this.credentialRepository.findCrendentialByPluginId(pluginId);
    if (!credentials) throw new BadRequestException('No credentials found for this plugin');

    const metric = await this.metricRepository.findMetricByType(pluginId, metricType);
    console.log('metric : ', metric);
    const alert = await this.alertRepository.findOne({ where: { metric: { id: metric?.id } } });
    console.log('alert : ', alert);

    switch (metricType) {
      case 'api_endpoint_health_check': {
        const result: ApiHealthCheckResult = await this.apiMonitoringService.apiHealthCheck({
          apiEndpoint: (JSON.parse(Buffer.from(credentials.value, 'base64').toString('utf-8')) as ApiEndpointCredentialType).apiEndpoint
        });
        if (!alert) return result;
        await this.alertUseCase.checkContiditionAndNotify(result, alert); // todo : send to event emitter
        return result;
      }
      default:
        return {};
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

  private mapToPluginCredential(credentialEntity: CredentialEntity): Credential {
    if (!credentialEntity) return null;
    return {
      type: credentialEntity.type as CredentialType,
      value: JSON.parse(Buffer.from(credentialEntity.value, 'base64').toString('utf-8')) as GenericCredentialType,
      pluginId: credentialEntity.pluginId
    };
  }
}
