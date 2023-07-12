import { FindManyOptions, FindOptionsWhere } from 'typeorm';

import { AlertRepository } from '../../../domain/interfaces/repository/alert.repository';
import { Alert } from '../../../domain/models/alert.model';
import { AlertEntity } from '../entities/alert.entity';

export class AlertInMemoryRepositoryImpl implements AlertRepository {
  private readonly alerts: AlertEntity[] = [];

  constructor() {}

  getAlerts(criterias: FindManyOptions<AlertEntity> | FindOptionsWhere<AlertEntity>): Promise<AlertEntity[]> {
    return Promise.resolve(this.alerts);
  }

  createAlert(payload): Promise<AlertEntity> {
    const alert = Object.assign(new AlertEntity(), payload);
    this.alerts.push(alert);
    return Promise.resolve(alert);
  }

  async updateAlert(id: string, payload: Partial<AlertEntity>): Promise<void> {
    let alert = this.alerts.find((alert) => alert.id === id);
    alert = { ...alert, ...payload };
    return Promise.resolve();
  }
}
