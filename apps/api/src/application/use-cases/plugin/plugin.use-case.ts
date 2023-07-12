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
import { GithubService } from '@metrikube/github-plugin';
import { PluginResponseDto, RegisterPluginRequestDto, RegisterPluginResponseDto } from '../../../presenter/dto/plugins.dto';

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
    const [plugins, metrics, credentials] = await Promise.all([this.pluginRepository.getPlugins(), this.metricRepository.getMetrics(), this.credentialRepository.getCredentials()]);

    return new PluginResponseDto(plugins, metrics, credentials);
  }

  async registerPlugin({
    pluginId,
    metricType,
    credential,
    ressourceId
  }: RegisterPluginRequestDto): Promise<RegisterPluginResponseDto> {
    const [plugin, metric]: [PluginEntity, MetricEntity] = await Promise.all([
      this.pluginRepository.findOneById(pluginId),
      this.metricRepository.findMetricByType(pluginId, metricType)
    ]);
    if (!plugin || !metric) throw new BadRequestException('Plugin or metric not found');

    const pluginTestConnection = await this.testPluginConnection(plugin, credential);
    if (!pluginTestConnection.ok) throw new BadRequestException(pluginTestConnection.message || 'Plugin connection failed');

    const [pluginCredential, pluginToMetric] = await Promise.all([
      this.credentialRepository.createCredential({ value: credential, pluginId, type: plugin.type as CredentialType }),
      this.pluginToMetricRepository.createPluginToMetric({ pluginId, metricId: metric.id, ressourceId, isActivated: true })
    ]);

    // TODO : dispatch refresh interval scheduler
    console.log('pluginCredential : ', pluginCredential);
    console.log('pluginToMetric : ', pluginToMetric);
    return Object.assign(new RegisterPluginResponseDto(), pluginToMetric);
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

  getGithubPlugin() {
    return this.githubService;
  }

  private async testPluginConnection(plugin: PluginEntity, credential: GenericCredentialType): Promise<{ ok: boolean; message: string | null }> {
    const pluginConnection: Record<Plugin['type'], PluginConnectionInterface> = {
      'api-endpoint-health-check': this.apiMonitoringService,
      'aws-bucket-single-instance': this.apiMonitoringService,
      'aws-bucket-multiple-instances': this.apiMonitoringService,
      'aws-ec2-multiple-instances-usage': this.apiMonitoringService,
      'aws-ec2-single-instance-usage': this.apiMonitoringService,
      'github-last-pr': this.apiMonitoringService,
      'database-queries': this.apiMonitoringService,
      'database-size': this.apiMonitoringService,
      'database-slow-queries': this.apiMonitoringService,
      'database-connections': this.apiMonitoringService
    };

    return pluginConnection[plugin.type].testConnection(credential);
  }
}
