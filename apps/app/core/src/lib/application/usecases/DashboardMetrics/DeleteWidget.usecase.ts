import type { DashboardMetricsAdapter } from "@metrikube/core";

export class DeleteWidgetUsecase {
    constructor(private readonly dashboardMetrics: DashboardMetricsAdapter) { }

    async execute(widgetId: string): Promise<void> {
        this.dashboardMetrics.deleteWidget(widgetId)
    }
}