import { AxiosInstance } from 'axios';

import { GenericCredentialType, MetricType, PluginResult } from '@metrikube/common';
import { PluginAdapter, PluginModel, SetupPluginRequest, ValidateCredentialsRequest } from '@metrikube/core';

export class PluginAdapterImpl implements PluginAdapter {
  constructor(private readonly http: AxiosInstance) { }

  // FIX resource id
  async setupWidget<T extends MetricType>({ pluginId, name, metricType, credential }: SetupPluginRequest): Promise<PluginResult<T>> {
    const { data } = await this.http.post('/widgets', { pluginId, metricType, credential, ressourceId: 'test', name });
    return data;
  }

  async getPlugins(): Promise<PluginModel[]> {
    const { data } = await this.http.get('/plugins');
    return data.plugins;
  }

  async validateCredentials<T extends MetricType>(payload: ValidateCredentialsRequest): Promise<PluginResult<T>> {
    try {
      const { data } = await this.http.post(`/credentials/validate/${payload.metricId}`, payload.credentials)
      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  };
}
