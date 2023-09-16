import { AxiosInstance } from 'axios';
import { fetchEventSource } from '@microsoft/fetch-event-source';

import { AlertModel, DashboardMetricsAdapter, WidgetModel } from '@metrikube/core';

export class DashboardMetricsImpl implements DashboardMetricsAdapter {
  constructor(private readonly http: AxiosInstance) { }

  getWidgets(): EventSource {
    return new EventSource("http://localhost:3000/api/v1/dashboard");
  }

  getNotifications(): EventSource {
    return new EventSource("http://localhost:3000/api/v1/dashboard/notifications");
  }

  async deleteWidget(widgetId: string): Promise<void> {
    await this.http.delete(`/dashboard/disable/${widgetId}`);
  }

  async getAlertFields(metricId: string): Promise<string[]> {
    const { data } = await this.http.get(`/metrics/${metricId}/describe`);
    return data;
  }
}
