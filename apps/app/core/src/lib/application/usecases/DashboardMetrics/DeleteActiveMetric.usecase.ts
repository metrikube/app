import type { DashboardMetricsAdapter } from "@metrikube/core";

export class DeleteActiveMetricUsecase {
    constructor(private readonly dashboardMetrics: DashboardMetricsAdapter) { }

    async execute(activeMetricId: string): Promise<void> {
        this.dashboardMetrics.deleteActiveMetric(activeMetricId)
    }
}