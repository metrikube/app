import { AlertAdapter, CreateAlert, CreateAlertRequest } from "@metrikube/core";

export class CreateAlertUsecase implements CreateAlert {

    constructor(private readonly alertAdapter: AlertAdapter) { }

    async execute(payload: CreateAlertRequest): Promise<void> {
        await this.alertAdapter.createAlert(payload)
    }
}