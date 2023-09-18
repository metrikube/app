import { AlertModel, DashboardMetricsAdapter, Option } from "@metrikube/core";

export class GetNotificationsUsecase {
    constructor(private readonly dashboardMetrics: DashboardMetricsAdapter) { }

    execute(): EventSource {
        return this.dashboardMetrics.getNotifications()
    }
}