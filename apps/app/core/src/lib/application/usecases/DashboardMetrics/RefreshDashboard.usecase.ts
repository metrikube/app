import type { DashboardMetricsAdapter, WidgetModel } from '@metrikube/core';

export class RefreshDashboardUsecase {
  constructor(private readonly dashboardMetrics: DashboardMetricsAdapter) { }

  execute(): Promise<WidgetModel[]> {
    return this.dashboardMetrics.getWidgetsHTTP();
  }
}
