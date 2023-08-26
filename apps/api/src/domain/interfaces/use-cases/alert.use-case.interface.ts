import { AlertEntity } from '../../../infrastructure/database/entities/alert.entity';
import { PluginToMetricEntity } from '../../../infrastructure/database/entities/plugin_to_metric.entity';
import { CreateAlertRequestDto, CreateAlertResponseDto } from '../../../presenter/alert/dtos/create-alert.dto';
import { Alert } from '../../models/alert.model';

export interface AlertUseCaseInterface {
  getPluginToMetricAlerts(pluginToMetricId: PluginToMetricEntity['id']): Promise<AlertEntity[]>;

  createAlertOnActivePlugin(pluginToMetricId: PluginToMetricEntity['id'], alert: CreateAlertRequestDto[]): Promise<CreateAlertResponseDto>;

  deleteAlert(alertId: string): void;
}
