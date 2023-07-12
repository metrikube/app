import { GenericCredentialType, MetricType } from "@metrikube/common";

export interface SetupPlugin {
  execute: (pluginId: string, metricType: MetricType, credential: GenericCredentialType) => Promise<unknown>
}
