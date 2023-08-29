import { AlertAdapter, AlertModel } from '@metrikube/core';

export class ToggleAlertNotificationUsecase {
    constructor(private readonly alertAdapter: AlertAdapter) { }

    async execute(alertId: string, isActive: boolean): Promise<void> {
        const payload: Partial<AlertModel> = { isActive }

        await this.alertAdapter.updateAlert(alertId, payload);
    }
}