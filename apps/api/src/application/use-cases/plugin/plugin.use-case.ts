import { ApiMonitoringService } from '@metrikube/api-monitoring';
import { AWSService } from '@metrikube/aws-plugin';
import { Plugin, PluginConnectionInterface } from '@metrikube/common';
import { ApiEndpointCredentialType, ApiHealthCheckResult, CredentialType, GenericCredentialType, MetricType, PluginResult } from '@metrikube/common';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { AlertRepository } from '../../../domain/interfaces/repository/alert.repository';
import { CredentialRepository } from '../../../domain/interfaces/repository/credential.repository';
import { MetricRepository } from '../../../domain/interfaces/repository/metric.repository';
import { PluginRepository } from '../../../domain/interfaces/repository/plugin.repository';
import { PluginToMetricRepository } from '../../../domain/interfaces/repository/plugin_to_metric.repository';
import { AlertUseCaseInterface } from '../../../domain/interfaces/use-cases/alert.use-case.interface';
import { PluginUseCaseInterface } from '../../../domain/interfaces/use-cases/plugin.use-case.interface';
import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { MetricEntity } from '../../../infrastructure/database/entities/metric.entity';
import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity';
import { PluginResponseDto, RegisterPluginRequestDto, RegisterPluginResponseDto } from '../../../presenter/dto/plugins.dto';

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
    const [plugins, metrics, credentials] = await Promise.all([this.pluginRepository.getPlugins(), this.metricRepository.getMetrics(), this.credentialRepository.getCredentials()]);

    return new PluginResponseDto(plugins, metrics, credentials);
  }

  async registerPlugin({ pluginId, metricType, credential, ressourceId }: RegisterPluginRequestDto): Promise<RegisterPluginResponseDto> {
    const [plugin, metric]: [PluginEntity, MetricEntity] = await Promise.all([
      this.pluginRepository.findOneById(pluginId),
      this.metricRepository.findMetricByType(pluginId, metricType)
    ]);

    if (!plugin || !metric) throw new BadRequestException('Plugin or metric not found');

    const pluginTestConnection = await this.testPluginConnection(plugin, credential);
    if (!pluginTestConnection.ok) throw new BadRequestException(pluginTestConnection.message || 'Plugin connection failed');

    // TODO : wrap into a transaction
    const [pluginCredential, pluginToMetric] = await Promise.all([
      this.credentialRepository.createCredential({ value: credential, plugin, type: plugin.credentialType as CredentialType }),
      this.pluginToMetricRepository.createPluginToMetric({ pluginId, metricId: metric.id, ressourceId, isActivated: true })
    ]);

    // TODO : dispatch refresh interval scheduler
    return new RegisterPluginResponseDto(pluginToMetric);
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

  private async testPluginConnection(
    plugin: PluginEntity,
    credential: GenericCredentialType
  ): Promise<{
    ok: boolean;
    message: string | null
  }> {
    const pluginConnection: Record<Plugin['type'], PluginConnectionInterface> = {
      'api': this.apiMonitoringService,
      'api_endpoint': this.apiMonitoringService,
      'github': this.apiMonitoringService,
      'aws': this.AWSService,
      'sql_database': this.apiMonitoringService
    };
    return pluginConnection[plugin.type].testConnection(credential);
  }
}
