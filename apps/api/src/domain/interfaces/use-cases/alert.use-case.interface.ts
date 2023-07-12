import { Metric } from '@metrikube/common';

import { AlertEntity } from '../../../infrastructure/database/entities/alert.entity';
import { Alert } from '../../models/alert.model';

export interface AlertUseCaseInterface {
  createAlert(metricId: Metric['id'], alert: Partial<Alert>): Promise<AlertEntity>;

  checkContiditionAndNotify(metricData: unknown, alert: AlertEntity): Promise<void>;
}
