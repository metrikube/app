import { DashboardMetricsAdapter } from '@metrikube/core';
import { AxiosInstance } from 'axios';

export class DashboardMetricsImpl implements DashboardMetricsAdapter {

  constructor(private readonly http: AxiosInstance) { }

  async getActiveMetrics() {
    const { data } = await this.http.get('/dashboard');

    return data;
  }
}
