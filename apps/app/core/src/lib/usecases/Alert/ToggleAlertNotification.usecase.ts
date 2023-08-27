import { AlertAdapter } from '@metrikube/core';

export class ToggleAlertNotificationUsecase {
    constructor(private readonly alertAdapter: AlertAdapter) { }

    async execute(alertId: string, isActive: boolean): Promise<void> {
        await this.alertAdapter.updateAlert(alertId, { isActive });
    }
}