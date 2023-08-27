import { AlertAdapter } from '@metrikube/core';

export class DeleteActiveMetricAlertUsecase {
    constructor(private readonly alertAdapter: AlertAdapter) { }

    async execute(activeMetricId: string): Promise<void> {
        await this.alertAdapter.deleteActiveMetricAlert(activeMetricId);
    }
}