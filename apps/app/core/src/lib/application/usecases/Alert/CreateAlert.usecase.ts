import type { AlertAdapter, CreateAlertRequest } from '@metrikube/core';

export class CreateAlertUsecase {
  constructor(private readonly alertAdapter: AlertAdapter) {}

  async execute(payload: CreateAlertRequest): Promise<void> {
    await this.alertAdapter.createAlert(payload);
  }
}
