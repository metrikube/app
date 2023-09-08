import { randomUUID } from 'node:crypto';

import { Inject, Injectable, Logger } from '@nestjs/common';

import { ApiMonitoringService } from '@metrikube/api-monitoring';
import { MetricThresholdOperator, MetricType, PluginResult } from '@metrikube/common';

import { NotificationInterface } from '../../../domain/interfaces/adapters/notification.interface';
import { AlertRepository } from '../../../domain/interfaces/repository/alert.repository';
import { CredentialRepository } from '../../../domain/interfaces/repository/credential.repository';
import { WidgetRepository } from '../../../domain/interfaces/repository/widget.repository';
import { SchedulerInterface } from '../../../domain/interfaces/scheduler/scheduler.interface';
import { AlertUseCaseInterface } from '../../../domain/interfaces/use-cases/alert.use-case.interface';
import { PluginUseCaseInterface } from '../../../domain/interfaces/use-cases/plugin.use-case.interface';
import { Alert } from '../../../domain/models/alert.model';
import { Widget } from '../../../domain/models/widget.model';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { CreateAlertRequestDto, CreateAlertResponseDto } from '../../../presenter/alert/dtos/create-alert.dto';
import { UpdateAlertDto } from '../../../presenter/alert/dtos/update-alert.dto';

// prettier-ignore
@Injectable()
export class AlertUseCase implements AlertUseCaseInterface {
  logger: Logger = new Logger(this.constructor.name);

  constructor(
    @Inject(DiTokens.AlertRepositoryToken) private readonly alertRepository: AlertRepository,
    @Inject(DiTokens.widgetRepositoryToken) private readonly widgetRepository: WidgetRepository,
    @Inject(DiTokens.Mailer) private readonly mailer: NotificationInterface,
    @Inject(DiTokens.CredentialRepositoryToken) private readonly credentialRepository: CredentialRepository,
    @Inject(DiTokens.Scheduler) private readonly scheduler: SchedulerInterface,
    @Inject(DiTokens.PluginUseCaseToken) private readonly pluginUseCase: PluginUseCaseInterface,
    @Inject(DiTokens.ApiMonitoringToken) private readonly apiMonitoringService: ApiMonitoringService
  ) {
  }

  getwidgetAlerts(widgetId: string): Promise<Alert[]> {
    return this.alertRepository.findByWidgetId(widgetId);
  }

  updateAlert(alertId: string, payload: UpdateAlertDto): Promise<void> {
    return this.alertRepository.updateAlert(alertId, payload);
  }

  async deleteAlert(alertId: string): Promise<void> {
    return this.alertRepository.deleteAlert(alertId);
  }

  async createAlertOnActivePlugin(widgetId: Widget['id'], alerts: CreateAlertRequestDto[]): Promise<CreateAlertResponseDto> {
    const activatedMetric = await this.widgetRepository.findwidgetById(widgetId);
    const createdAlerts = await this.alertRepository.createAlerts(
      alerts.map((alert) =>
        new Alert(randomUUID(), alert.label, widgetId, true, false, alert.condition))
    );

    await Promise.all(createdAlerts.map(this.registerAlerJob.bind(this)(activatedMetric)));

    return new CreateAlertResponseDto(createdAlerts);
  }

  async checkContiditionAndNotify(metricData: unknown, alert: Alert): Promise<void> {
    const { field, operator, threshold } = alert.condition;
    const isConditionMet = this.checkConditionThreshold(metricData[field], operator, threshold);

    const isBelowThresholdAndNotified = !isConditionMet && alert.triggered;
    if (isBelowThresholdAndNotified && alert.triggered !== isBelowThresholdAndNotified) {
      Logger.log('L\'alerte passe sous le seuil', this.constructor.name);
      return this.alertRepository.updateAlert(alert.id, { triggered: false });
    }

    if (isConditionMet && !alert.triggered) {
      Logger.warn(`La condition est remplie [${metricData[field]} ${operator} ${threshold}] 👉🏼 on doit notifier`, this.constructor.name);
      // todo : pass the user_email when running the container
      await this.mailer.sendMail(process.env.USER_EMAIL, '🚨 Metrikube : alerte dépassement seuil', 'Seuil limite dépassé');
      return this.alertRepository.updateAlert(alert.id, { triggered: true });
    }
  }

  checkConditionThreshold(value: string | number, operator: MetricThresholdOperator, threshold: string | number): boolean {
    const operators: MetricThresholdOperator[] = ['gt', 'lt', 'eq', 'gte', 'lte', 'neq'];
    if (!operators.includes(operator)) throw new Error('Invalid operator');

    const operation: Record<MetricThresholdOperator, (value: string | number) => boolean> = {
      eq: (value) => value === threshold,
      neq: (value) => value !== threshold,
      gt: (value) => value > threshold,
      lt: (value) => value < threshold,
      gte: (value) => value >= threshold,
      lte: (value) => value <= threshold
    };

    return operation[operator](value);
  }

  private registerAlerJob(activatedMetric: Widget): (alert: Alert) => Promise<void> {
    return (alert: Alert): Promise<void> => {
      const jobName = `[${alert.id}] ${activatedMetric.plugin.name} // ${activatedMetric.metric.name}`;
      return this.scheduler.scheduleAlert(jobName, activatedMetric.metric.refreshInterval, this.jobRunner.bind(this, alert.id));
    };
  }

  private async jobRunner(id: string): Promise<void> {
    const alert: Alert = await this.alertRepository.findAlertById(id);
    const metric: Widget = await this.widgetRepository.findwidgetById(alert.widgetId);
    const metricData: PluginResult<MetricType> = await this.pluginUseCase.refreshPluginMetric(metric.pluginId, alert.widgetId);
    return this.checkContiditionAndNotify(metricData, alert);
  }
}
