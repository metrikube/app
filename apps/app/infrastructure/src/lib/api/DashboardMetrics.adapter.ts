import { WidgetModel, DashboardMetricsAdapter } from '@metrikube/core';
import { AxiosInstance } from 'axios';

export class DashboardMetricsImpl implements DashboardMetricsAdapter {

  constructor(private readonly http: AxiosInstance) { }

  async getWidgets(): Promise<WidgetModel[]> {
    const { data } = await this.http.get<WidgetModel[]>('/dashboard');

    return data;
  }

  async deleteWidget(widgetId: string): Promise<void> {
    await this.http.delete(`/dashboard/disable/${widgetId}`)
  }
}
