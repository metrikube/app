import type { DashboardMetricsAdapter, WidgetModel } from '@metrikube/core';

export class GetWidgetsUsecase {
  constructor(private readonly dashboardMetrics: DashboardMetricsAdapter) { }

  execute(): EventSource {
    return this.dashboardMetrics.getWidgets();
  }
}
