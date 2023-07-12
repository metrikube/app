import { ApiMonitoringService } from '@metrikube/api-monitoring';
import { AWSService } from '@metrikube/aws-plugin';
import { Plugin } from '@metrikube/common';
import { ApiEndpointCredentialType, ApiHealthCheckResult, CredentialType, GenericCredentialType, MetricType, PluginResult } from '@metrikube/common';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { AlertRepository } from '../../../domain/interfaces/repository/alert.repository';
import { CredentialRepository } from '../../../domain/interfaces/repository/credential.repository';
import { MetricRepository } from '../../../domain/interfaces/repository/metric.repository';
import { PluginRepository } from '../../../domain/interfaces/repository/plugin.repository';
import { PluginToMetricRepository } from '../../../domain/interfaces/repository/plugin_to_metric.repository';
import { AlertUseCaseInterface } from '../../../domain/interfaces/use-cases/alert.use-case.interface';
import { PluginUseCaseInterface } from '../../../domain/interfaces/use-cases/plugin.use-case.interface';
import { Alert } from '../../../domain/models/alert.model';
import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity';
import { PluginResponseDto } from '../../../presenter/dto/plugins.dto';

// prettier-ignore
@Injectable()
export class PluginUseCase implements PluginUseCaseInterface {
  constructor(
    @Inject('PLUGIN_REPOSITORY') private readonly pluginRepository: PluginRepository,
    @Inject('CREDENTIAL_REPOSITORY') private readonly credentialRepository: CredentialRepository,
    @Inject('ALERT_REPOSITORY') private readonly alertRepository: AlertRepository,
    @Inject('METRIC_REPOSITORY') private readonly metricRepository: MetricRepository,
    @Inject('PLUGIN_TO_METRIC_REPOSITORY') private readonly pluginToMetricRepository: PluginToMetricRepository,
    @Inject('ALERT_USE_CASE') private readonly alertUseCase: AlertUseCaseInterface,
    @Inject('AWS_PLUGIN') private readonly AWSService: AWSService,
    @Inject('API_MONITORING') private readonly apiMonitoringService: ApiMonitoringService
  ) {
  }

  async listPlugins(): Promise<PluginResponseDto> {
    try {
      const [plugins, metrics, credentials] = await Promise.all([
        this.pluginRepository.getPlugins(),
        this.metricRepository.getMetrics(),
        this.credentialRepository.getCredentials()
      ]);

      return new PluginResponseDto(plugins, metrics, credentials);
    } catch (error) {
      throw error;
    }
  }

  async refreshPluginMetric(pluginId: string, metricType: MetricType): Promise<PluginResult<MetricType>> {
    const credentials = await this.credentialRepository.findCrendentialByPluginId(pluginId);
    if (!credentials) throw new BadRequestException('No credentials found for this plugin');

    const metric = await this.metricRepository.findMetricByType(pluginId, metricType);
    const [alert] = await this.alertRepository.getAlerts({ where: { pluginToMetric: { metricId: metric?.id } } });

    switch (metricType) {
      case 'api-endpoint-health-check': {
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
}
