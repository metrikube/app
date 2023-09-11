import type { AlertAdapter, AlertModel } from '@metrikube/core';

export class GetActiveMetricAlertUsecase {
    constructor(private readonly alertAdapter: AlertAdapter) { }

    async execute(widgetId: string): Promise<AlertModel[]> {
        return this.alertAdapter.getWidgetAlerts(widgetId);
    }
}