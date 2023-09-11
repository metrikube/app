import { CreateAlertRequestDto, CreateAlertResponseDto } from '../../../presenter/alert/dtos/create-alert.dto';
import { UpdateAlertDto } from '../../../presenter/alert/dtos/update-alert.dto';
import { Alert } from '../../models/alert.model';

export interface AlertUseCaseInterface {
  getwidgetAlerts(widgetId: string): Promise<Alert[]>;

  createAlertOnActivePlugin(widgetId: string, alert: CreateAlertRequestDto[]): Promise<CreateAlertResponseDto>;

  updateAlert(alertId: string, payload: UpdateAlertDto): Promise<void>;

  deleteAlert(alertId: string): Promise<void>;
}
