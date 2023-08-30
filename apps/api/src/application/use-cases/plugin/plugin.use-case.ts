import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { ApiMonitoringService } from '@metrikube/api-monitoring';
import { AWSService } from '@metrikube/aws-plugin';
import { CredentialType, GenericCredentialType, MetricType, Plugin, PluginConnectionInterface, PluginResult } from '@metrikube/common';
import { GithubService } from '@metrikube/github-plugin';

import { AlertRepository } from '../../../domain/interfaces/repository/alert.repository';
import { CredentialRepository } from '../../../domain/interfaces/repository/credential.repository';
import { MetricRepository } from '../../../domain/interfaces/repository/metric.repository';
import { PluginToMetricRepository } from '../../../domain/interfaces/repository/plugin-to-metric.repository';
import { PluginRepository } from '../../../domain/interfaces/repository/plugin.repository';
import { SchedulerInterface } from '../../../domain/interfaces/scheduler/scheduler.interface';
import { PluginUseCaseInterface } from '../../../domain/interfaces/use-cases/plugin.use-case.interface';
import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { MetricEntity } from '../../../infrastructure/database/entities/metric.entity';
import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { PluginResponseDto } from '../../../presenter/plugin/dtos/plugins.dto';
import { RegisterPluginRequestDto, RegisterPluginResponseDto } from '../../../presenter/plugin/dtos/register-plugin.dto';

// prettier-ignore
@Injectable()
export class PluginUseCase implements PluginUseCaseInterface {
  constructor(
    @Inject(DiTokens.AWSServiceToken) private readonly AWSService: AWSService,
    @Inject(DiTokens.AlertRepositoryToken) private readonly alertRepository: AlertRepository,
    @Inject(DiTokens.ApiMonitoringToken) private readonly apiMonitoringService: ApiMonitoringService,
    @Inject(DiTokens.CredentialRepositoryToken) private readonly credentialRepository: CredentialRepository,
    @Inject(DiTokens.GithubServiceToken) private readonly githubService: GithubService,
    @Inject(DiTokens.MetricRepositoryToken) private readonly metricRepository: MetricRepository,
    @Inject(DiTokens.PluginRepositoryToken) private readonly pluginRepository: PluginRepository,
    @Inject(DiTokens.PluginToMetricRepositoryToken) private readonly pluginToMetricRepository: PluginToMetricRepository,
    @Inject(DiTokens.Scheduler) private readonly scheduler: SchedulerInterface
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

  async registerPlugin({ pluginId, metricType, credential, resourceId, name }: RegisterPluginRequestDto): Promise<RegisterPluginResponseDto> {
    const [plugin, metric]: [PluginEntity, MetricEntity] = await Promise.all([
      this.pluginRepository.findOneById(pluginId),
      this.metricRepository.findMetricByType(pluginId, metricType)
    ]);
    if (!plugin || !metric) throw new BadRequestException('Plugin or metric not found');

    await this.testPluginConnection(plugin, credential);

    // TODO : wrap into a transaction
    const [_, pluginToMetric] = await Promise.all([
      this.credentialRepository.createCredential({ value: credential, plugin, type: plugin.credentialType as CredentialType }),
      this.pluginToMetricRepository.createPluginToMetric({ pluginId, metricId: metric.id, resourceId, name, isActivated: true })
    ]);

    const pluginDataSample = await this.refreshPluginMetric(pluginId, metricType);

    return new RegisterPluginResponseDto(pluginToMetric, pluginDataSample);
  }

  /**
   * TODO : sécurisé si jamais l'utlisateurs supprime envoi un pluginId qui n'a pas de metricType associé
   * @param pluginId
   * @param metricType
   */
  async refreshPluginMetric(pluginId: string, metricType: MetricType): Promise<PluginResult<MetricType>> {
    const credentials = await this.credentialRepository.findCrendentialByPluginId(pluginId);
    if (!credentials) throw new BadRequestException('No credentials found for this plugin');

    const parsedCredentials = JSON.parse(Buffer.from(credentials.value, 'base64').toString('utf-8')) as GenericCredentialType;
    const getMetricTypeDataSample: (credentials: GenericCredentialType) => Promise<PluginResult<MetricType>> = this.getMetricMethodByMetricType(metricType);
    return getMetricTypeDataSample(parsedCredentials);
  }

  getMetricMethodByMetricType(metricType: MetricType): (credentials: GenericCredentialType) => Promise<PluginResult<typeof metricType>> {
    switch (metricType) {
      case 'api-endpoint-health-check':
        return this.apiMonitoringService.apiHealthCheck;
      case 'github-last-issues':
        return this.githubService.getRepoIssues;
      case 'aws-bucket-single-instance':
        throw 'Not implemented';
      case 'aws-bucket-multiple-instances':
        throw 'Not implemented';
      case 'aws-ec2-multiple-instances-usage':
        throw 'Not implemented';
      case 'aws-ec2-single-instance-usage':
        throw 'Not implemented';
      case 'github-last-prs':
        throw 'Not implemented';
      case 'database-queries':
        throw 'Not implemented';
      case 'database-size':
        throw 'Not implemented';
      case 'database-slow-queries':
        throw 'Not implemented';
      case 'database-connections':
        throw 'Not implemented';
      default:
        throw new BadRequestException('Invalid metric type');
    }

  }

  getPluginCredentials(pluginId: string): Promise<CredentialEntity> {
    return this.credentialRepository.findCrendentialByPluginId(pluginId);
  }

  async create(plugin: Plugin): Promise<PluginEntity> {
    return this.pluginRepository.createPlugin(plugin);
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
