import { ActiveMetricModel } from "../../domain";
import { DashboardMetricsAdapter } from "../../ports/server-side/DashboardMetrics.port";

export class GetActiveMetricsUsecase {
  constructor(private readonly dashboardMetrics: DashboardMetricsAdapter) { }

  async execute(): Promise<ActiveMetricModel[]> {
    return this.dashboardMetrics.getActiveMetrics()
  }
}