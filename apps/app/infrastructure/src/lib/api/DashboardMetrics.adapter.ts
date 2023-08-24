import { ActiveMetricModel, DashboardMetricsAdapter } from '@metrikube/core';
import { AxiosInstance } from 'axios';

export class DashboardMetricsImpl implements DashboardMetricsAdapter {

  constructor(private readonly http: AxiosInstance) { }

  async getActiveMetrics(): Promise<ActiveMetricModel[]> {
    const { data } = await this.http.get<ActiveMetricModel[]>('/dashboard');

    return data;
  }
}
