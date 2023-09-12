import type { DashboardMetricsAdapter } from '@metrikube/core';

export class DeleteWidgetUsecase {
  constructor(private readonly dashboardMetrics: DashboardMetricsAdapter) {}

  async execute(widgetId: string): Promise<void> {
    await this.dashboardMetrics.deleteWidget(widgetId);
  }
}
