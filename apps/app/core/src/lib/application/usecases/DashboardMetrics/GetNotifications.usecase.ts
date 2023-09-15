import { AlertModel, DashboardMetricsAdapter, Option } from "@metrikube/core";

export class GetNotificationsUsecase {
    constructor(private readonly dashboardMetrics: DashboardMetricsAdapter) { }

    async execute(): Promise<AlertModel[]> {
        return this.dashboardMetrics.getNotifications()
    }
}