import { RefreshDashboardResponseDto } from '../../../presenter/dashboard/dtos/refresh-dashboard-response.dto';

export interface DashboardUseCaseInterface {
  refreshDashboard(): Promise<RefreshDashboardResponseDto[]>;

  disableDashboardMetric(widgetId: string): Promise<void>;
}
