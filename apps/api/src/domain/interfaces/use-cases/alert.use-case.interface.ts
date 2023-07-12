import { AlertEntity } from '../../../infrastructure/database/entities/alert.entity';
import { PluginToMetricEntity } from '../../../infrastructure/database/entities/plugin_to_metric.entity';
import { CreateAlertRequestDto, CreateAlertResponseDto } from '../../../presenter/alert/dtos/create-alert.dto';

export interface AlertUseCaseInterface {
  createAlert(pluginToMetricId: PluginToMetricEntity['id'], alert: Partial<CreateAlertRequestDto>): Promise<CreateAlertResponseDto>;

  checkContiditionAndNotify(metricData: unknown, alert: AlertEntity): Promise<void>;

  deleteAlert(alertId: string): void;
}
