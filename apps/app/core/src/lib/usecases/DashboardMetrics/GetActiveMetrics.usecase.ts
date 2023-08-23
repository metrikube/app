import { DashboardMetricsAdapter } from "../../ports/server-side/DashboardMetrics.port";

export class GetActiveMetricsUsecase {
    constructor(private readonly dashboardMetrics: DashboardMetricsAdapter) {}
  
    async execute(): Promise<unknown> {
      return this.dashboardMetrics.getActiveMetrics()
    }
  }