import { Inject, Injectable, Logger } from '@nestjs/common';

import { MetricThresholdOperator, MetricType, PluginResult } from '@metrikube/common';

import { NotificationInterface } from '../../../domain/interfaces/adapters/notification.interface';
import { AlertRepository } from '../../../domain/interfaces/repository/alert.repository';
import { CredentialRepository } from '../../../domain/interfaces/repository/credential.repository';
import { PluginToMetricRepository } from '../../../domain/interfaces/repository/plugin-to-metric.repository';
import { SchedulerInterface } from '../../../domain/interfaces/scheduler/scheduler.interface';
import { AlertUseCaseInterface } from '../../../domain/interfaces/use-cases/alert.use-case.interface';
import { PluginUseCaseInterface } from '../../../domain/interfaces/use-cases/plugin.use-case.interface';
import { Alert } from '../../../domain/models/alert.model';
import { AlertEntity } from '../../../infrastructure/database/entities/alert.entity';
import { PluginToMetricEntity } from '../../../infrastructure/database/entities/plugin_to_metric.entity';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { CreateAlertRequestDto, CreateAlertResponseDto } from '../../../presenter/alert/dtos/create-alert.dto';
import { UpdateAlertDto } from '../../../presenter/alert/dtos/update-alert.dto';

// prettier-ignore
@Injectable()
export class AlertUseCase implements AlertUseCaseInterface {
  logger: Logger = new Logger(this.constructor.name);

  constructor(
    @Inject(DiTokens.AlertRepositoryToken) private readonly alertRepository: AlertRepository,
    @Inject(DiTokens.PluginToMetricRepositoryToken) private readonly pluginToMetricRepository: PluginToMetricRepository,
    @Inject(DiTokens.Mailer) private readonly mailer: NotificationInterface,
    @Inject(DiTokens.CredentialRepositoryToken) private readonly credentialRepository: CredentialRepository,
    @Inject(DiTokens.Scheduler) private readonly scheduler: SchedulerInterface,
    @Inject(DiTokens.PluginUseCaseToken) private readonly pluginUseCase: PluginUseCaseInterface
  ) {
  }

  async deleteAlert(alertId: string): Promise<void> {
    try {
      this.scheduler.unscheduleRelatedAlerts(alertId);
    } catch (e) {
      this.logger.warn(e.message);
    }
    return this.alertRepository.deleteAlert(alertId);
  }


  async createAlertOnActivePlugin(pluginToMetricId: PluginToMetricEntity['id'], alerts: CreateAlertRequestDto[]): Promise<CreateAlertResponseDto> {
    const activatedMetric = await this.pluginToMetricRepository.findPluginToMetricById(pluginToMetricId);
    const createdAlerts = await this.alertRepository.createAlerts(
      alerts.map((alert) => ({
        ...alert,
        metricId: activatedMetric.metricId,
        pluginToMetricId,
        triggered: false
      })) as Alert[]
    );

    await Promise.all(createdAlerts.map(this.registerAlerJob.bind(this)(activatedMetric)));

    return new CreateAlertResponseDto(createdAlerts);
  }

  async checkContiditionAndNotify(metricData: unknown, alert: AlertEntity): Promise<void> {
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

  getPluginToMetricAlerts(pluginToMetricId: PluginToMetricEntity['id']): Promise<AlertEntity[]> {
    return this.alertRepository.findByWidgetId(pluginToMetricId);
  }

  async updateAlert(alertId: string, payload: UpdateAlertDto): Promise<void> {
    if (!('isActive' in payload)) return this.alertRepository.updateAlert(alertId, payload);
    if (payload.isActive) {
      const alert: AlertEntity = await this.alertRepository.findAlertById(alertId);
      const pluginToMetric: PluginToMetricEntity = await this.pluginToMetricRepository.findPluginToMetricById(alert.pluginToMetricId);
      await this.scheduler.scheduleAlert(alertId, pluginToMetric.metric.refreshInterval, this.jobRunner.bind(this, alertId));
      return this.alertRepository.updateAlert(alertId, payload);
    }

    this.scheduler.unscheduleRelatedAlerts(alertId);
    return this.alertRepository.updateAlert(alertId, payload);
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

  private registerAlerJob(activatedMetric: PluginToMetricEntity): (alert: AlertEntity) => Promise<void> {
    return (alert: AlertEntity): Promise<void> => {
      return this.scheduler.scheduleAlert(alert.id, activatedMetric.metric.refreshInterval, this.jobRunner.bind(this, alert.id));
    };
  }

  private async jobRunner(id: string): Promise<void> {
    const alert: AlertEntity = await this.alertRepository.findAlertById(id);
    const metric: PluginToMetricEntity = await this.pluginToMetricRepository.findPluginToMetricById(alert.pluginToMetricId);
    const metricData: PluginResult<MetricType> = await this.pluginUseCase.refreshPluginMetric(metric.pluginId, alert.pluginToMetricId);
    return this.checkContiditionAndNotify(metricData, alert);
  }
}
