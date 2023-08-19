import { Inject, Logger } from '@nestjs/common';

import { ApiMonitoringService } from '@metrikube/api-monitoring';
import { CredentialType, GenericCredentialType, MetricType, PluginResult } from '@metrikube/common';
import { GithubService } from '@metrikube/github-plugin';

import { CredentialRepository } from '../../../domain/interfaces/repository/credential.repository';
import { PluginToMetricRepository } from '../../../domain/interfaces/repository/plugin-to-metric.repository';
import { DashboardUseCaseInterface } from '../../../domain/interfaces/use-cases/dashboard.use-case.interface';
import { PluginUseCaseInterface } from '../../../domain/interfaces/use-cases/plugin.use-case.interface';
import { Credential } from '../../../domain/models/credential.model';
import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity';
import { PluginToMetricEntity } from '../../../infrastructure/database/entities/plugin_to_metric.entity';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { RefreshDashboardResponseDto } from '../../../presenter/dashboard/dtos/refresh-dashboard-response.dto';

type ActivatedMetric = PluginToMetricEntity & Credential;

export class DashboardUseCase implements DashboardUseCaseInterface {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(DiTokens.PluginToMetricRepositoryToken) private readonly pluginToMetricRepository: PluginToMetricRepository,
    @Inject(DiTokens.CredentialRepositoryToken) private readonly credentialRepository: CredentialRepository,
    @Inject(DiTokens.PluginUseCaseToken) private readonly pluginUseCase: PluginUseCaseInterface,
    @Inject(DiTokens.ApiMonitoringToken) private readonly apiMonitoringService: ApiMonitoringService,
    @Inject(DiTokens.GithubServiceToken) private readonly githubService: GithubService
  ) {}

  async refreshDashboard(): Promise<RefreshDashboardResponseDto[]> {
    this.logger.log('refreshing dashboard...');

    const credentials = await this.credentialRepository.getCredentials();
    const activatedMetricsWithCredentials = await this.getActiveMetricsWithCredentials(credentials);

    return this.resolveMetrics(activatedMetricsWithCredentials);
  }

  private async getActiveMetricsWithCredentials(credentials: CredentialEntity[]): Promise<ActivatedMetric[]> {
    const activatedMetrics: PluginToMetricEntity[] = await this.pluginToMetricRepository.getActiveMetrics({
      relations: { plugin: true, metric: true }
    });

    return activatedMetrics.map((configuredMetric) => ({
      ...configuredMetric,
      ...this.mapToPluginCredential(
        configuredMetric.plugin,
        credentials.find((credential) => credential.pluginId === configuredMetric.plugin.id)
      )
    })) as ActivatedMetric[];
  }

  private async resolveMetrics(activatedMetricsWithCredentials: ActivatedMetric[]): Promise<RefreshDashboardResponseDto[]> {
    const metricResultMap: Record<string, RefreshDashboardResponseDto> = {};

    for (const metricCredential of activatedMetricsWithCredentials) {
      const metricResult = this.pluginUseCase.getMetricMethodByMetricType(metricCredential.metric.type as MetricType)(metricCredential.value as GenericCredentialType);
      metricResultMap[metricCredential.id] = new RefreshDashboardResponseDto(
        metricCredential.id,
        metricCredential.plugin as PluginEntity,
        metricCredential.metric,
        metricCredential.resourceId,
        metricResult
      );
    }

    return Object.values(metricResultMap);
  }

  private mapToPluginCredential(plugin: PluginEntity, credentialEntity: CredentialEntity): Credential {
    return {
      type: plugin.credentialType as CredentialType,
      value: credentialEntity?.value ? (JSON.parse(Buffer.from(credentialEntity.value, 'base64').toString('utf-8')) as GenericCredentialType) : null
    };
  }
}
