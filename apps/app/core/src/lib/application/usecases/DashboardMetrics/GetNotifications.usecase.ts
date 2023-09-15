import { AlertModel, DashboardMetricsAdapter, Option } from "@metrikube/core";

export class GetNotificationsUsecase {
    constructor(private readonly dashboardMetrics: DashboardMetricsAdapter) { }

    async execute(): Promise<AlertModel[]> {
        const notifications = await this.dashboardMetrics.getNotifications()
        console.log(notifications)
        return notifications
    }
}