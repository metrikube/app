import { AxiosInstance } from 'axios';

import { DashboardMetricsAdapter, WidgetModel } from '@metrikube/core';

export class DashboardMetricsImpl implements DashboardMetricsAdapter {
  constructor(private readonly http: AxiosInstance) {}

  async getWidgets(): Promise<WidgetModel[]> {
    const { data } = await this.http.get<WidgetModel[]>('/dashboard');

    return data;
  }

  async deleteWidget(widgetId: string): Promise<void> {
    await this.http.delete(`/dashboard/disable/${widgetId}`);
  }

  async getAlertFields(metricId: string): Promise<string[]> {
    const { data } = await this.http.get(`/metrics/${metricId}/describe`);
    return data;
  }
}
