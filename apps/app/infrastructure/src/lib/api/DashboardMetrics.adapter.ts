import { ActiveMetricModel, DashboardMetricsAdapter } from '@metrikube/core';
import { AxiosInstance } from 'axios';

export class DashboardMetricsImpl implements DashboardMetricsAdapter {

  constructor(private readonly http: AxiosInstance) { }

  async getActiveMetrics(): Promise<ActiveMetricModel[]> {
    const { data } = await this.http.get<ActiveMetricModel[]>('/dashboard');

    return data;
  }

  async deleteActiveMetric(activeMetricId: string): Promise<void> {
    await this.http.delete(`/dashboard/disable/${activeMetricId}`)
  }
}
