import { GenericCredentialType, MetricType, PluginResult } from "@metrikube/common";

export interface SetupPlugin {
  execute: (pluginId: string, metricType: MetricType, credential: GenericCredentialType) => Promise<PluginResult<typeof metricType>>
}
