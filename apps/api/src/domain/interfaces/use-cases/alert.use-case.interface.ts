import { AlertEntity } from '../../../infrastructure/database/entities/alert.entity';
import { PluginToMetricEntity } from '../../../infrastructure/database/entities/plugin_to_metric.entity';
import { CreateAlertRequestDto, CreateAlertResponseDto } from '../../../presenter/alert/dtos/create-alert.dto';
import { UpdateAlertDto } from '../../../presenter/alert/dtos/update-alert.dto';

export interface AlertUseCaseInterface {
  getPluginToMetricAlerts(pluginToMetricId: PluginToMetricEntity['id']): Promise<AlertEntity[]>;

  createAlertOnActivePlugin(pluginToMetricId: PluginToMetricEntity['id'], alert: CreateAlertRequestDto[]): Promise<CreateAlertResponseDto>;

  updateAlert(alertId: string, payload: UpdateAlertDto): Promise<void>;

  deleteAlert(alertId: string): Promise<void>;
}
