import { Inject, Logger } from '@nestjs/common';

import { GenericCredentialType, MetricType } from '@metrikube/common';

import { PluginResolverInterface } from '../../../domain/interfaces/common/plugin-resolver.interface';
import { CredentialRepository } from '../../../domain/interfaces/repository/credential.repository';
import { WidgetRepository } from '../../../domain/interfaces/repository/widget.repository';
import { SchedulerInterface } from '../../../domain/interfaces/scheduler/scheduler.interface';
import { DashboardUseCaseInterface } from '../../../domain/interfaces/use-cases/dashboard.use-case.interface';
import { PluginUseCaseInterface } from '../../../domain/interfaces/use-cases/plugin.use-case.interface';
import { Credential } from '../../../domain/models/credential.model';
import { Plugin } from '../../../domain/models/plugin.model';
import { Widget } from '../../../domain/models/widget.model';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { RefreshDashboardResponseDto } from '../../../presenter/dashboard/dtos/refresh-dashboard-response.dto';

type ActivatedMetric = Widget & { type: string; value: GenericCredentialType };

export class DashboardUseCase implements DashboardUseCaseInterface {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(DiTokens.WidgetRepositoryToken) private readonly widgetRepository: WidgetRepository,
    @Inject(DiTokens.CredentialRepositoryToken) private readonly credentialRepository: CredentialRepository,
    @Inject(DiTokens.PluginUseCaseToken) private readonly pluginUseCase: PluginUseCaseInterface,
    @Inject(DiTokens.Scheduler) private readonly scheduler: SchedulerInterface,
    @Inject(DiTokens.PluginResolver) private readonly pluginResolver: PluginResolverInterface
  ) {}

  async refreshDashboard(): Promise<RefreshDashboardResponseDto[]> {
    this.logger.log('refreshing dashboard...');

    const credentials = await this.credentialRepository.getCredentials();
    const activatedMetricsWithCredentials = await this.getActiveMetricsWithCredentials(credentials);

    return this.resolveMetrics(activatedMetricsWithCredentials);
  }

  async disableDashboardMetric(widgetId: string): Promise<void> {
    this.scheduler.unscheduleRelatedAlerts(widgetId);

    await this.widgetRepository.disablewidget(widgetId);
  }

  private async getActiveMetricsWithCredentials(credentials: Credential[]): Promise<ActivatedMetric[]> {
    const activatedMetrics: Widget[] = await this.widgetRepository.getActiveMetricsWithRelations();

    return activatedMetrics.map((widget) => ({
      ...widget,
      ...this.mapToPluginCredential(
        widget.plugin,
        credentials.find((credential) => credential.id === widget.credentialId)
      )
    }));
  }

  private async resolveMetrics(activatedMetricsWithCredentials: ActivatedMetric[]): Promise<RefreshDashboardResponseDto[]> {
    const metricResultMap: Record<string, RefreshDashboardResponseDto> = {};
    for (const metricCredential of activatedMetricsWithCredentials) {
      const metricResult = await this.pluginResolver.queryPluginDataByMetricType(metricCredential.metric.type as MetricType, metricCredential.value);
      metricResultMap[metricCredential.id] = new RefreshDashboardResponseDto(
        metricCredential.id,
        metricCredential.name,
        metricCredential.description,
        metricCredential.plugin,
        metricCredential.metric,
        metricCredential.resourceId,
        metricResult
      );
    }

    return Object.values(metricResultMap);
  }

  private mapToPluginCredential(plugin: Plugin, credentialEntity: Credential): { type: string; value: GenericCredentialType } {
    return {
      type: plugin.credentialType,
      value: credentialEntity?.value ? (JSON.parse(Buffer.from(credentialEntity.value, 'base64').toString('utf-8')) as GenericCredentialType) : null
    };
  }
}
