import { AxiosInstance } from 'axios';

import { DashboardMetricsAdapter } from '@metrikube/core';

import { baseURL } from '../../../../web/src/config/axios';

export class DashboardMetricsImpl implements DashboardMetricsAdapter {
  constructor(private readonly http: AxiosInstance) {}

  getWidgets(): EventSource {
    return new EventSource(`${baseURL}/dashboard`);
  }

  getNotifications(): EventSource {
    return new EventSource(`${baseURL}/api/v1/dashboard/notifications`);
  }

  async deleteWidget(widgetId: string): Promise<void> {
    await this.http.delete(`/dashboard/disable/${widgetId}`);
  }

  async getAlertFields(metricId: string): Promise<string[]> {
    const { data } = await this.http.get(`/metrics/${metricId}/describe`);
    return data;
  }
}
