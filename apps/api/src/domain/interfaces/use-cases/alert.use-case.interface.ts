import { AlertEntity } from '../../../infrastructure/database/entities/alert.entity';
import { PluginToMetricEntity } from '../../../infrastructure/database/entities/plugin_to_metric.entity';
import { CreateAlertRequestDto, CreateAlertResponseDto } from '../../../presenter/alert/dtos/create-alert.dto';
import { Alert } from '../../models/alert.model';

export interface AlertUseCaseInterface {
  createAlert(pluginToMetricId: PluginToMetricEntity['id'], alert: CreateAlertRequestDto): Promise<CreateAlertResponseDto>;

  checkContiditionAndNotify(metricData: unknown, alert: AlertEntity): Promise<void>;

  deleteAlert(alertId: string): void;
}
