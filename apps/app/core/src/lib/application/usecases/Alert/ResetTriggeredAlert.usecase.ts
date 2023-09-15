import type { AlertAdapter, AlertModel } from '@metrikube/core';

export class ResetTriggeredAlertUsecase {
    constructor(private readonly alertAdapter: AlertAdapter) { }

    async execute(alertId: string): Promise<void> {
        const payload: Partial<AlertModel> = { triggered: false }
        await this.alertAdapter.updateAlert(alertId, payload);
    }
}