import type { GenericCredentialType, MetricType, PluginResult } from '@metrikube/common';

import type { PluginModel, ValidateCredentialsRequest } from '@metrikube/core';

export type SetupPluginRequest = {
  pluginId: string;
  name: string;
  metricType: MetricType;
  credential: GenericCredentialType;
  ressourceId?: string;
};

export interface PluginAdapter {
  getPlugins: () => Promise<PluginModel[]>;
  setupPlugin: <T extends MetricType>(payload: SetupPluginRequest) => Promise<PluginResult<T>>;
  validateCredentials: <T extends MetricType>(payload: ValidateCredentialsRequest) => Promise<PluginResult<T>>
}
