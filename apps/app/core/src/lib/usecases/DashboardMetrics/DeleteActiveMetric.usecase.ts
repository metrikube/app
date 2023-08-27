import { DashboardMetricsAdapter } from "../../ports/server-side/DashboardMetrics.port";

export class DeleteActiveMetricUsecase {
    constructor(private readonly dashboardMetrics: DashboardMetricsAdapter) { }

    async execute(activeMetricId: string): Promise<void> {
        this.dashboardMetrics.deleteActiveMetric(activeMetricId)
    }
}