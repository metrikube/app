import { DashboardNotificationDto } from '../../../presenter/dashboard/dtos/dashboard-notification.dto';
import { RefreshDashboardResponseDto } from '../../../presenter/dashboard/dtos/refresh-dashboard-response.dto';

export interface DashboardUseCaseInterface {
  refreshDashboard(): Promise<RefreshDashboardResponseDto[]>;

  getDashboardNotification(): Promise<DashboardNotificationDto[]>;

  disableDashboardMetric(widgetId: string): Promise<void>;
}
