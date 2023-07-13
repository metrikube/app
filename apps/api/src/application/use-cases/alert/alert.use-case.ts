import { Inject, Injectable, Logger } from '@nestjs/common';

import { NotificationInterface } from '../../../domain/interfaces/adapters/notification.interface';
import { AlertRepository } from '../../../domain/interfaces/repository/alert.repository';
import { AlertUseCaseInterface } from '../../../domain/interfaces/use-cases/alert.use-case.interface';
import { Alert, MetricThresholdOperator } from '../../../domain/models/alert.model';
import { AlertEntity } from '../../../infrastructure/database/entities/alert.entity';
import { PluginToMetricEntity } from '../../../infrastructure/database/entities/plugin_to_metric.entity';
import { CreateAlertRequestDto, CreateAlertResponseDto } from '../../../presenter/alert/dtos/create-alert.dto';

// prettier-ignore
@Injectable()
export class AlertUseCase implements AlertUseCaseInterface {
  constructor(
    @Inject('ALERT_REPOSITORY') private readonly alertRepository: AlertRepository,
    @Inject('MAILER') private readonly mailer: NotificationInterface
  ) {}

  async createAlert(pluginToMetricId: PluginToMetricEntity['id'], alerts: CreateAlertRequestDto[]): Promise<CreateAlertResponseDto> {
    const createdAlert = await this.alertRepository.createAlerts(alerts.map(alert => ({
      ...alert,
      pluginToMetricId,
      triggered: false
    })) as Alert[]);

    // todo : dispatch event to scheduler queue
    return new CreateAlertResponseDto(createdAlert);
  }

  deleteAlert(alertId: string) {
    return this.alertRepository.deleteAlert(alertId);
  }

  async checkContiditionAndNotify(metricData: unknown, alert: AlertEntity): Promise<void> {
    const { field, operator, threshold } = alert.condition;
    const isConditionMet = this.checkConditionThreshold(metricData[field], operator, threshold);

    const isBelowThresholdAndNotified = !isConditionMet && alert.triggered;
    if (isBelowThresholdAndNotified && alert.triggered !== isBelowThresholdAndNotified) {
      Logger.log("L'alerte passe sous le seuil", this.constructor.name);
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
}
