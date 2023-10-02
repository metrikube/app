import { AxiosInstance } from 'axios';

import { DashboardMetricsAdapter } from '@metrikube/core';

export class DashboardMetricsImpl implements DashboardMetricsAdapter {
  constructor(private readonly http: AxiosInstance, private readonly baseURL: string) {}

  getWidgets(): EventSource {
    return new EventSource(`${this.baseURL}/dashboard`);
  }

  getNotifications(): EventSource {
    return new EventSource(`${this.baseURL}/dashboard/notifications`);
  }

  async deleteWidget(widgetId: string): Promise<void> {
    await this.http.delete(`/dashboard/disable/${widgetId}`);
  }

  async getAlertFields(metricId: string): Promise<string[]> {
    const { data } = await this.http.get(`/metrics/${metricId}/describe`);
    return data;
  }
}
