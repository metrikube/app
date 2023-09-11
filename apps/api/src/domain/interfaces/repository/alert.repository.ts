import { UpdateAlertDto } from '../../../presenter/alert/dtos/update-alert.dto';
import { Alert } from '../../models/alert.model';

export interface AlertRepository {
  getAlerts(): Promise<Alert[]>;

  findAlertById(id: string): Promise<Alert>;

  findByWidgetId(widgetId: string): Promise<Alert[]>;

  createAlerts(alertOrAlerts: Partial<Alert[]>): Promise<Alert[]>;

  updateAlert(id: string, payload: UpdateAlertDto): Promise<void>;

  deleteAlert(alertId: string): Promise<void>;
}
