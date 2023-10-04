import type { DashboardMetricsAdapter, NotificationModel, WidgetModel } from '@metrikube/core';

export class RefreshNotificationsUsecase {
    constructor(private readonly dashboardMetrics: DashboardMetricsAdapter) { }

    execute(): Promise<NotificationModel[]> {
        return this.dashboardMetrics.getNotificationsHTTP();
    }
}
