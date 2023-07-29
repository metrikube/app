import { ApiMonitoringService } from '@metrikube/api-monitoring';
import { AWSService } from '@metrikube/aws-plugin';
import { Plugin, PluginConnectionInterface } from '@metrikube/common';
import { ApiEndpointCredentialType, ApiHealthCheckResult, CredentialType, GenericCredentialType, MetricType, PluginResult } from '@metrikube/common';
import { GithubService } from '@metrikube/github-plugin';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { AlertRepository } from '../../../domain/interfaces/repository/alert.repository';
import { CredentialRepository } from '../../../domain/interfaces/repository/credential.repository';
import { MetricRepository } from '../../../domain/interfaces/repository/metric.repository';
import { PluginToMetricRepository } from '../../../domain/interfaces/repository/plugin-to-metric.repository';
import { PluginRepository } from '../../../domain/interfaces/repository/plugin.repository';
import { AlertUseCaseInterface } from '../../../domain/interfaces/use-cases/alert.use-case.interface';
import { PluginUseCaseInterface } from '../../../domain/interfaces/use-cases/plugin.use-case.interface';
import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { MetricEntity } from '../../../infrastructure/database/entities/metric.entity';
import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity';
import { PluginResponseDto } from '../../../presenter/plugin/dtos/plugins.dto';
import { RegisterPluginRequestDto, RegisterPluginResponseDto } from '../../../presenter/plugin/dtos/register-plugin.dto';

// prettier-ignore
@Injectable()
export class PluginUseCase implements PluginUseCaseInterface {
  constructor(
    @Inject('PLUGIN_REPOSITORY') private readonly pluginRepository: PluginRepository,
    @Inject('CREDENTIAL_REPOSITORY') private readonly credentialRepository: CredentialRepository,
    @Inject('AWS_PLUGIN') private readonly AWSService: AWSService,
    @Inject('GITHUB_PLUGIN') private readonly githubService: GithubService,
    @Inject('ALERT_USE_CASE') private readonly alertUseCase: AlertUseCaseInterface,
    @Inject('ALERT_REPOSITORY') private readonly alertRepository: AlertRepository,
    @Inject('METRIC_REPOSITORY') private readonly metricRepository: MetricRepository,
    @Inject('PLUGIN_TO_METRIC_REPOSITORY') private readonly pluginToMetricRepository: PluginToMetricRepository,
    @Inject('API_MONITORING') private readonly apiMonitoringService: ApiMonitoringService
  ) {
  }

  async listPlugins(): Promise<PluginResponseDto> {
    const [plugins, metrics, credentials]: [PluginEntity[], MetricEntity[], CredentialEntity[]] = await Promise.all([
      this.pluginRepository.getPlugins(),
      this.metricRepository.getMetrics(),
      this.credentialRepository.getCredentials()
    ]);

    return new PluginResponseDto(plugins, metrics, credentials);
  }

  async registerPlugin({ pluginId, metricType, credential, resourceId }: RegisterPluginRequestDto): Promise<RegisterPluginResponseDto> {
    const [plugin, metric]: [PluginEntity, MetricEntity] = await Promise.all([
      this.pluginRepository.findOneById(pluginId),
      this.metricRepository.findMetricByType(pluginId, metricType)
    ]);
    if (!plugin || !metric) throw new BadRequestException('Plugin or metric not found');

    await this.testPluginConnection(plugin, credential);

    // TODO : wrap into a transaction
    const [pluginCredential, pluginToMetric] = await Promise.all([
      this.credentialRepository.createCredential({ value: credential, plugin, type: plugin.credentialType as CredentialType }),
      this.pluginToMetricRepository.createPluginToMetric({ pluginId, metricId: metric.id, resourceId, isActivated: true })
    ]);

    const pluginDataSample = await this.refreshPluginMetric(pluginId, metricType);

    return new RegisterPluginResponseDto(pluginToMetric, pluginDataSample);
  }

  async refreshPluginMetric(pluginId: string, metricType: MetricType): Promise<PluginResult<MetricType>> {
    const credentials = await this.credentialRepository.findCrendentialByPluginId(pluginId);
    if (!credentials) throw new BadRequestException('No credentials found for this plugin');

    switch (metricType) {
      case 'api-endpoint-health-check': {
        return this.apiMonitoringService.apiHealthCheck({
          apiEndpoint: (JSON.parse(Buffer.from(credentials.value, 'base64').toString('utf-8')) as ApiEndpointCredentialType).apiEndpoint
        });
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

  getGithubPlugin() {
    return this.githubService;
  }

  private async testPluginConnection(
    plugin: PluginEntity,
    credential: GenericCredentialType
  ): Promise<void> {
    const pluginConnection: Record<Plugin['type'], PluginConnectionInterface> = {
      api: this.apiMonitoringService,
      api_endpoint: this.apiMonitoringService,
      github: this.githubService,
      aws: this.AWSService,
      sql_database: this.apiMonitoringService,
      database: this.apiMonitoringService
    };
    const pluginTestConnection: { ok: boolean; message: string | null } = await pluginConnection[plugin.type].testConnection(credential);
    if (!pluginTestConnection.ok) throw new BadRequestException(pluginTestConnection.message || 'Plugin connection failed');
  }
}
