import { AxiosInstance } from 'axios';

import { AlertAdapter, AlertModel, CreateAlertRequest } from '@metrikube/core';

export class AlertAdapterImpl implements AlertAdapter {
  constructor(private readonly http: AxiosInstance) { }

  async getActiveMetricAlerts(activeMetricId: string): Promise<AlertModel[]> {
    const { data } = await this.http.get<AlertModel[]>(`/widgets/${activeMetricId}/alerts`)
    return data
  }

  async createAlert({ pluginToMetricId, alerts = [] }: CreateAlertRequest): Promise<void> {
    await this.http.post(`/widgets/${pluginToMetricId}/alerts`, [...alerts]);
  }

  async updateAlert(alertId: string, payload: Partial<AlertModel>): Promise<void> {
    await this.http.patch(`/alerts/${alertId}`, payload)
  }

  async deleteAlert(alertId: string): Promise<void> {
    await this.http.delete(`/alerts/${alertId}`)
  }
}
