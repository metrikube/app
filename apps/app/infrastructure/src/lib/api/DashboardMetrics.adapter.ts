import { AxiosInstance } from 'axios';

import { DashboardMetricsAdapter } from '@metrikube/core';

export class DashboardMetricsImpl implements DashboardMetricsAdapter {
  constructor(private readonly http: AxiosInstance) {}

  getWidgets(): EventSource {
    return new EventSource(`${this.http.getUri()}/dashboard`);
  }

  getNotifications(): EventSource {
    return new EventSource(`${this.http.getUri()}/dashboard/notifications`);
  }

  async deleteWidget(widgetId: string): Promise<void> {
    await this.http.delete(`/dashboard/disable/${widgetId}`);
  }

  async getAlertFields(metricId: string): Promise<string[]> {
    const { data } = await this.http.get(`/metrics/${metricId}/describe`);
    return data;
  }
}
