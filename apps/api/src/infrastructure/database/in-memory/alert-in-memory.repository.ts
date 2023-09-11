import { FindManyOptions, FindOptionsWhere } from 'typeorm';

import { AlertRepository } from '../../../domain/interfaces/repository/alert.repository';
import { AlertEntity } from '../entities/alert.entity';

export class AlertInMemoryRepositoryImpl implements AlertRepository {
  public alerts: AlertEntity[] = [];

  constructor() {}

  getAlerts(criterias: FindManyOptions<AlertEntity> | FindOptionsWhere<AlertEntity>): Promise<AlertEntity[]> {
    return Promise.resolve(this.alerts);
  }

  findByWidgetId(widgetId: string): Promise<AlertEntity[]> {
    return Promise.resolve(this.alerts.filter((alert) => alert.pluginToMetricId === widgetId));
  }

  findAlertById(id: string): Promise<AlertEntity> {
    return Promise.resolve(this.alerts.find((alert) => alert.id === id));
  }

  findActiveAlertById(id: string): Promise<AlertEntity> {
    return Promise.resolve(this.alerts.find((alert) => alert.id === id && alert.isActive));
  }

  createAlerts(payload): Promise<AlertEntity[]> {
    const alert = Object.assign(new AlertEntity(), payload);
    this.alerts.push(alert);
    return Promise.resolve([alert]);
  }

  async updateAlert(id: string, payload: Partial<AlertEntity>): Promise<void> {
    const alertIndex = this.alerts.findIndex((alert) => alert.id === id);
    if (alertIndex !== -1) {
      this.alerts[alertIndex] = {
        ...this.alerts[alertIndex],
        ...payload
      };
    }
  }

  async deleteAlert(id: string): Promise<void> {
    this.alerts.splice(
      this.alerts.findIndex((alert) => alert.id === id),
      1
    );
    return Promise.resolve();
  }
}
