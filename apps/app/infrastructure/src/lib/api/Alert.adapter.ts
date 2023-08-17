import { AxiosInstance } from 'axios';

import { AlertAdapter, CreateAlertRequest } from '@metrikube/core';

export class AlertAdapterImpl implements AlertAdapter {
  constructor(private readonly http: AxiosInstance) {}

  async createAlert({ pluginToMetricId, alerts = [] }: CreateAlertRequest): Promise<void> {
    await this.http.post(`/alerts/${pluginToMetricId}`, [...alerts]);
  }
}
