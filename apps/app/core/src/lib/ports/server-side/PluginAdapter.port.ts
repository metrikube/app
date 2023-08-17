import { GenericCredentialType, MetricType, PluginResult } from '@metrikube/common';

import { PluginModel } from '../../domain';

export type SetupPluginRequest = {
  pluginId: string;
  metricType: MetricType;
  credential: GenericCredentialType;
  ressourceId?: string;
};

export interface PluginAdapter {
  getPlugins: () => Promise<PluginModel[]>;
  setupPlugin: <T extends MetricType>(payload: SetupPluginRequest) => Promise<PluginResult<T>>;
}
