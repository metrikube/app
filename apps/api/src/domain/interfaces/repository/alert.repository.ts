import { FindManyOptions, FindOptionsWhere } from 'typeorm';

import { AlertEntity } from '../../../infrastructure/database/entities/alert.entity';
import { Alert } from '../../models/alert.model';

export interface AlertRepository {
  getAlerts(criterias: FindManyOptions<AlertEntity> | FindOptionsWhere<AlertEntity>): Promise<AlertEntity[]>;

  createAlerts(alertOrAlerts: Partial<Alert[]>): Promise<AlertEntity[]>;

  updateAlert(id: string, payload: Partial<AlertEntity>): Promise<void>;

  deleteAlert(alertId: string): Promise<void>;
}
