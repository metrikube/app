import { Inject, Logger } from '@nestjs/common';

import { GenericCredentialType, MetricType } from '@metrikube/common';

import { EncryptionServiceInterface } from '../../../domain/interfaces/common/encryption-service.interface';
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

export type ActivatedMetric = Widget & { type: string; value: GenericCredentialType };

export class DashboardUseCase implements DashboardUseCaseInterface {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(DiTokens.WidgetRepositoryToken) private readonly widgetRepository: WidgetRepository,
    @Inject(DiTokens.CredentialRepositoryToken) private readonly credentialRepository: CredentialRepository,
    @Inject(DiTokens.PluginUseCaseToken) private readonly pluginUseCase: PluginUseCaseInterface,
    @Inject(DiTokens.Scheduler) private readonly scheduler: SchedulerInterface,
    @Inject(DiTokens.PluginResolver) private readonly pluginResolver: PluginResolverInterface,
    @Inject(DiTokens.EncryptionService) private readonly encryptionService: EncryptionServiceInterface
  ) {}

  async refreshDashboard(): Promise<RefreshDashboardResponseDto[]> {
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
    const metricResultMap: Map<string, RefreshDashboardResponseDto> = new Map<string, RefreshDashboardResponseDto>();

    for (const metricCredential of activatedMetricsWithCredentials) {
      const metricResult = await this.pluginResolver.queryPluginDataByMetricType(metricCredential.metric.type as MetricType, metricCredential.value);
      metricResultMap.set(metricCredential.id, new RefreshDashboardResponseDto(metricCredential, metricResult));
    }

    return [...metricResultMap.values()];
  }

  private mapToPluginCredential(plugin: Plugin, credential: Credential): { type: string; value: GenericCredentialType } {
    return {
      type: plugin.credentialType,
      value: this.encryptionService.decryptJson<GenericCredentialType>(credential.value) || null
    };
  }
}
