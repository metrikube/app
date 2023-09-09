import type { WidgetModel, DashboardMetricsAdapter } from "@metrikube/core";

export class GetWidgetsUsecase {
  constructor(private readonly dashboardMetrics: DashboardMetricsAdapter) { }

  async execute(): Promise<WidgetModel[]> {
    return this.dashboardMetrics.getWidgets()
  }
}