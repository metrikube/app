import type { ActiveMetricModel, DashboardMetricsAdapter } from "@metrikube/core";

export class GetActiveMetricsUsecase {
  constructor(private readonly dashboardMetrics: DashboardMetricsAdapter) { }

  async execute(): Promise<ActiveMetricModel[]> {
    return this.dashboardMetrics.getActiveMetrics()
  }
}