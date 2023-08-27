import { AxiosInstance } from 'axios';

import { AlertAdapter, AlertModel, CreateAlertRequest } from '@metrikube/core';

export class AlertAdapterImpl implements AlertAdapter {
  constructor(private readonly http: AxiosInstance) { }

  async getActiveMetricAlerts(activeMetricId: string): Promise<AlertModel[]> {
    const { data } = await this.http.get<AlertModel[]>(`/alerts/${activeMetricId}`)
    return data
  }

  async createAlert({ pluginToMetricId, alerts = [] }: CreateAlertRequest): Promise<void> {
    await this.http.post(`/alerts/${pluginToMetricId}`, [...alerts]);
  }

  async updateNotificationAlert(alertId: string): Promise<void> {
    await this.http.patch(`/alerts/${alertId}`)
  }

  async deleteActiveMetricAlert(alertId: string): Promise<void> {
    await this.http.delete(`/alerts/${alertId}`)
  }
}
