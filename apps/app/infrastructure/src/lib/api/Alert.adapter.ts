import { AxiosInstance } from 'axios';

import { AlertAdapter, AlertModel, CreateAlertRequest } from '@metrikube/core';

export class AlertAdapterImpl implements AlertAdapter {
  constructor(private readonly http: AxiosInstance) { }

  async getWidgetAlerts(widgetId: string): Promise<AlertModel[]> {
    const { data } = await this.http.get<AlertModel[]>(`/alerts/${widgetId}`)
    return data
  }

  async createAlert({ pluginToMetricId, alerts = [] }: CreateAlertRequest): Promise<void> {
    await this.http.post(`/alerts/${pluginToMetricId}`, [...alerts]);
  }

  async updateAlert(alertId: string, payload: Partial<AlertModel>): Promise<void> {
    await this.http.patch(`/alerts/${alertId}`, payload)
  }

  async deleteAlert(alertId: string): Promise<void> {
    await this.http.delete(`/alerts/${alertId}`)
  }
}
