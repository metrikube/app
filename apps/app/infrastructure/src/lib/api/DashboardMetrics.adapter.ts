import { MetricType, PluginResult } from '@metrikube/common';
import type { ActiveMetricModel, DashboardMetricsAdapter } from '@metrikube/core';
import { AxiosInstance } from 'axios';

export class DashboardMetricsImpl implements DashboardMetricsAdapter {

  constructor(private readonly http: AxiosInstance) { }

  async getActiveMetrics(): Promise<ActiveMetricModel[]> {
    const { data } = await this.http.get<ActiveMetricModel[]>('/dashboard');

    return data;
  }

  async deleteActiveMetric(widgetId: string): Promise<void> {
    await this.http.delete(`/widgets/${widgetId}`)
  }

  async getAlertFields(metricId: string): Promise<string[]> {
    const { data } = await this.http.get(`/metrics/${metricId}/describe`)
    console.log(data)
    return ['status', 'value']
  }
}
