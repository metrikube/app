import { AlertEntity } from '../../../infrastructure/database/entities/alert.entity';
import { Alert } from '../../models/alert.model';
import { Metric } from '../../models/metric.model';

export interface AlertUseCaseInterface {
  createAlert(metricId: Metric['id'], alert: Partial<Alert>): Promise<AlertEntity>;

  checkContiditionAndNotify(metricData: unknown, alert: AlertEntity): Promise<void>;
}
