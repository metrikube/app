import { AlertAdapter } from '@metrikube/core';

export class GetActiveAlertUsecase {
    constructor(private readonly alertAdapter: AlertAdapter) { }

    async execute(activeMetricId: string): Promise<void> {
        await this.alertAdapter.getActiveMetricAlerts(activeMetricId);
    }
}