import { AlertAdapter } from '@metrikube/core';

export class DeleteActiveMetricAlertUsecase {
    constructor(private readonly alertAdapter: AlertAdapter) { }

    async execute(alertId: string): Promise<void> {
        await this.alertAdapter.deleteAlert(alertId);
    }
}