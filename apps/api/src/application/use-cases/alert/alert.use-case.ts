import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';

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
export class AlertUseCase implements AlertUseCaseInterface, OnModuleInit {
  logger: Logger = new Logger(this.constructor.name);

  constructor(
    @Inject(DiTokens.AlertRepositoryToken) private readonly alertRepository: AlertRepository,
    @Inject(DiTokens.WidgetRepositoryToken) private readonly widgetRepository: WidgetRepository,
    @Inject(DiTokens.Mailer) private readonly mailer: NotificationInterface,
    @Inject(DiTokens.CredentialRepositoryToken) private readonly credentialRepository: CredentialRepository,
    @Inject(DiTokens.Scheduler) private readonly scheduler: SchedulerInterface,
    @Inject(DiTokens.PluginUseCaseToken) private readonly pluginUseCase: PluginUseCaseInterface
  ) {
  }

  async onModuleInit(): Promise<void> {
    try {
      const widgets = await this.widgetRepository.getActiveMetricsWithRelations();
      const nbOfAlerts = widgets.flatMap((widget) => widget.alerts).length || 0;
      this.logger.debug(`Find ${nbOfAlerts} alerts to schedule`);
      if (!nbOfAlerts) return;
      this.logger.debug(`Scheduling alerts...`);
      await Promise.all(
        widgets
          .filter((widget) => widget.alerts.length)
          .map(this.scheduleActiveAlerts.bind(this))
      );
    } catch (e) {
      this.logger.error(e.message);
    } finally {
      this.logger.debug(`(Re)Scheduling alerts done!`);
    }
  }

  getwidgetAlerts(widgetId: string): Promise<Alert[]> {
    return this.alertRepository.findByWidgetId(widgetId);
  }

  getTriggeredAlerts(): Promise<Alert[]> {
    return this.alertRepository.findTriggeredAlerts();
  }

  async deleteAlert(alertId: string): Promise<void> {
    try {
      this.scheduler.unscheduleRelatedAlerts(alertId);
    } catch (e) {
      this.logger.warn(e.message);
    }
    return this.alertRepository.deleteAlert(alertId);
  }

  async createAlertOnActivePlugin(widgetId: Widget["id"], alerts: CreateAlertRequestDto[]): Promise<CreateAlertResponseDto> {
    const activatedMetric = await this.widgetRepository.findwidgetById(widgetId);
    const createdAlerts = await this.alertRepository.createAlerts(
      alerts.map(({ label, condition }) => ({
        label,
        widgetId,
        condition,
        triggered: false
      } as Alert))
    );

    await Promise.all(createdAlerts.map(this.registerAlertJob.bind(this)(activatedMetric)));

    return new CreateAlertResponseDto(createdAlerts);
  }

  async checkContiditionAndNotify(metricData: unknown, alert: Alert): Promise<void> {
    const { field, operator, threshold } = alert.condition;
    const isConditionMet = this.checkConditionThreshold(metricData[field], operator, threshold);

    const isBelowThresholdAndNotified = !isConditionMet && alert.triggered;
    if (isBelowThresholdAndNotified && alert.triggered !== isBelowThresholdAndNotified) {
      Logger.log("L'alerte passe sous le seuil", this.constructor.name);
      return this.alertRepository.updateAlert(alert.id, { triggered: false });
    }

    if (isConditionMet && !alert.triggered) {
      Logger.warn(`La condition est remplie [${metricData[field]} ${operator} ${threshold}] 👉🏼 on doit notifier`, this.constructor.name);
      await this.mailer.sendMail(
        process.env.USER_EMAIL,
        `🚨 Metrikube: alerte ${alert.label}`,
        `Bonjour,<br>L'alerte ${alert.label} a été activée.<br>Le seuil défini est ${alert.condition.threshold}, mais le résultat est ${metricData[field]}.`
      );
      return this.alertRepository.updateAlert(alert.id, { triggered: true, triggeredAt: new Date() });
    }
  }

  async updateAlert(alertId: string, payload: UpdateAlertDto): Promise<void> {
    if (!("isActive" in payload)) return this.alertRepository.updateAlert(alertId, payload);
    if (payload.isActive) {
      const alert: Alert = await this.alertRepository.findAlertById(alertId);
      const widget: Widget = await this.widgetRepository.findwidgetById(alert.widgetId);
      await this.scheduler.scheduleAlert(alertId, widget.metric.refreshInterval, this.jobRunner.bind(this, alertId));
      return this.alertRepository.updateAlert(alertId, payload);
    }

    this.scheduler.unscheduleRelatedAlerts(alertId);
    return this.alertRepository.updateAlert(alertId, payload);
  }

  checkConditionThreshold(value: string | number, operator: MetricThresholdOperator, threshold: string | number): boolean {
    const operators: MetricThresholdOperator[] = ["gt", "lt", "eq", "gte", "lte", "neq"];
    if (!operators.includes(operator)) throw new Error("Invalid operator");

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

  private registerAlertJob(activatedMetric: Widget): (alert: Alert) => Promise<void> {
    return (alert: Alert): Promise<void> => {
      return this.scheduler.scheduleAlert(alert.id, activatedMetric.metric.refreshInterval, this.jobRunner.bind(this, alert.id));
    };
  }

  private scheduleActiveAlerts(widget: Widget): Promise<void>[] {
    return widget.alerts.filter((alert) => alert.isActive).map(this.registerAlertJob.bind(this)(widget));
  }

  private async jobRunner(id: string): Promise<void> {
    const alert: Alert = await this.alertRepository.findAlertById(id);
    const metric: Widget = await this.widgetRepository.findwidgetById(alert.widgetId);
    const metricData: PluginResult<MetricType> = await this.pluginUseCase.refreshPluginMetric(metric.pluginId, alert.widgetId);
    return this.checkContiditionAndNotify(metricData, alert);
  }
}
