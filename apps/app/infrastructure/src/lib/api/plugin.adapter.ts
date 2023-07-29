import { AxiosInstance } from 'axios';

import { MetricType, PluginResult } from '@metrikube/common';
import { PluginAdapter, PluginModel, SetupPluginRequest } from '@metrikube/core';

export class PluginAdapterImpl implements PluginAdapter {
  constructor(private readonly http: AxiosInstance) {}

  async setupPlugin<T extends MetricType>({ pluginId, metricType, credential }: SetupPluginRequest): Promise<PluginResult<T>> {
    const { data } = await this.http.post('/plugins', { pluginId, metricType, credential, ressourceId: 'test' });
    return data;
  }

  async getPlugins(): Promise<PluginModel[]> {
    const { data } = await this.http.get('/plugins');
    return data.plugins;
  }
}
