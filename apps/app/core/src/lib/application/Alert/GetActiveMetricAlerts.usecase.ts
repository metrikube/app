import type { AlertAdapter, AlertModel } from '@metrikube/core';

export class GetActiveMetricAlertUsecase {
    constructor(private readonly alertAdapter: AlertAdapter) { }

    async execute(activeMetricId: string): Promise<AlertModel[]> {
        return this.alertAdapter.getActiveMetricAlerts(activeMetricId);
    }
}