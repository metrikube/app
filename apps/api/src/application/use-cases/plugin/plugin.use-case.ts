import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { ApiMonitoringService } from '@metrikube/api-monitoring';
import { AWSService } from '@metrikube/aws-plugin';
import { CredentialType, GenericCredentialType, MetricType, Plugin, PluginConnectionInterface, PluginResult } from '@metrikube/common';
import { DbAnalyticsPluginService } from '@metrikube/db-analytics-plugin';
import { GithubService } from '@metrikube/github-plugin';

import { PluginResolverInterface } from '../../../domain/interfaces/common/plugin-resolver.interface';
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
import { PluginToMetricEntity } from '../../../infrastructure/database/entities/plugin_to_metric.entity';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { PluginResponseDto } from '../../../presenter/plugin/dtos/plugins.dto';
import { RegisterPluginRequestDto, RegisterPluginResponseDto } from '../../../presenter/plugin/dtos/register-plugin.dto';

// prettier-ignore
@Injectable()
export class PluginUseCase implements PluginUseCaseInterface {
  /**
   * TODO : move into a plugin/metric dynamic resolver : getConnector(type)
   */
  pluginConnector: Record<Plugin['type'], PluginConnectionInterface> = {
    api_endpoint: this.apiMonitoringService,
    github: this.githubService,
    aws: this.AWSService,
    sql_database: this.databaseService
  };

  constructor(
    @Inject(DiTokens.AWSServiceToken) private readonly AWSService: AWSService,
    @Inject(DiTokens.AlertRepositoryToken) private readonly alertRepository: AlertRepository,
    @Inject(DiTokens.ApiMonitoringToken) private readonly apiMonitoringService: ApiMonitoringService,
    @Inject(DiTokens.CredentialRepositoryToken) private readonly credentialRepository: CredentialRepository,
    @Inject(DiTokens.GithubServiceToken) private readonly githubService: GithubService,
    @Inject(DiTokens.MetricRepositoryToken) private readonly metricRepository: MetricRepository,
    @Inject(DiTokens.PluginRepositoryToken) private readonly pluginRepository: PluginRepository,
    @Inject(DiTokens.PluginToMetricRepositoryToken) private readonly pluginToMetricRepository: PluginToMetricRepository,
    @Inject(DiTokens.Scheduler) private readonly scheduler: SchedulerInterface,
    @Inject(DiTokens.DbAnalyticsPluginServiceToken) private readonly databaseService: DbAnalyticsPluginService,
    // @Inject(DiTokens.PluginResolver) private readonly pluginResolver: PluginResolverInterface
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

    const pluginCredential = await this.credentialRepository.createCredential({
      value: credential,
      plugin,
      type: plugin.credentialType as CredentialType
    })
    // TODO : wrap into a transaction
    /**
     * Ajouter le credential id au niveau du widget pour pouvoir le récupérer et pouvoir ajouter plusieurs même widget mais sur des plugins différents
     */
    const pluginToMetric = await this.pluginToMetricRepository.createPluginToMetric({
      pluginId,
      name,
      credentialId: pluginCredential.id,
      metricId: metric.id,
      resourceId,
      isActive: true
    });

    const pluginDataSample = await this.refreshPluginMetric(pluginId, pluginToMetric.id);

    return new RegisterPluginResponseDto(pluginToMetric, pluginDataSample);
  }

  async getPluginTrackableFieldsByMetricId(metricId: string): Promise<string[]> {
    console.log('metricId : ', metricId);
    const metric = await this.metricRepository.findById(metricId);
    if (!metric) throw new NotFoundException('Metric not found');

    return this.describeMetricTrackableFields(metric?.plugin.type, metric.type);
  }

  /**
   * TODO : sécurisé si jamais l'utlisateurs supprime un plugin et envoi un pluginId qui n'a pas de metricType associé
   * @param pluginId
   * @param pluginToMetricId
   */
  async refreshPluginMetric(pluginId: PluginEntity['id'], pluginToMetricId: PluginToMetricEntity['id']): Promise<PluginResult<MetricType>> {
    const pluginToMetric = await this.pluginToMetricRepository.findPluginToMetricById(pluginToMetricId);
    const credentials = await this.credentialRepository.findCredentialByIdAndPluginId(pluginToMetric.credentialId, pluginId);
    if (!credentials) throw new BadRequestException('No credentials found for this plugin');
    const metricType = pluginToMetric.metric.type as MetricType;

    const parsedCredentials = JSON.parse(Buffer.from(credentials.value, 'base64').toString('utf-8')) as GenericCredentialType;
    const getMetricTypeDataSample: (credentials: GenericCredentialType) => Promise<PluginResult<MetricType>> = this.getMetricMethodByMetricType(metricType);
    return getMetricTypeDataSample(parsedCredentials);
  }

  getMetricMethodByMetricType(metricType: MetricType): (credentials: GenericCredentialType) => Promise<PluginResult<typeof metricType>> {
    /**
     * TODO : move into a plugin/metric dynamic resolver
     */
    switch (metricType) {
      case 'api-endpoint-health-check':
        return this.apiMonitoringService.apiHealthCheck;
      case 'github-last-issues':
        return this.githubService.getRepoIssues;
      case 'aws-bucket-single-instance':
        return this.AWSService.getS3Bucket;
      case 'aws-bucket-multiple-instances':
        return this.AWSService.getS3Buckets;
      case 'aws-ec2-multiple-instances-usage':
        return this.AWSService.getEc2Instances;
      case 'aws-ec2-single-instance-usage':
        return this.AWSService.getEc2Instance;
      case 'github-last-prs':
        return this.githubService.getRepoPRs;
      case 'database-queries':
        return this.databaseService.getNbQueries
      case 'database-size':
        return this.databaseService.getDbSize
      case 'database-slow-queries':
        return this.databaseService.getSlowQuery
      case 'database-connections':
        throw 'Not implemented';
      default:
        throw new BadRequestException('Invalid metric type');
    }
  }

  async fetchMetricDataSampleWithCredential(metricId: string, credential: GenericCredentialType): Promise<PluginResult<MetricType>> {
    const metric: MetricEntity = await this.metricRepository.findById(metricId );
    const getMetricTypeDataSample: (credentials: GenericCredentialType) => Promise<PluginResult<MetricType>> = this.getMetricMethodByMetricType(metric.type as MetricType);
    return getMetricTypeDataSample(credential);
  }

  getPluginCredentials(pluginId: string): Promise<CredentialEntity> {
    return this.credentialRepository.findCrendentialByPluginId(pluginId);
  }

  async create(plugin: Plugin): Promise<PluginEntity> {
    return this.pluginRepository.createPlugin(plugin);
  }

  async testPluginConnection(
    plugin: PluginEntity,
    credential: GenericCredentialType
  ): Promise<void> {
    const pluginTestConnection: { ok: boolean; message: string | null } = await this.pluginConnector[plugin.type].testConnection(credential);
    if (!pluginTestConnection.ok) throw new BadRequestException(pluginTestConnection.message || 'Plugin connection failed');
  }

  /**
   * TODO : move into a plugin/metric dynamic resolver
   */
  describeMetricTrackableFields(pluginType: string, metricType: MetricType): string[] {
    return this.pluginConnector[pluginType].describe(metricType);
  }
}
