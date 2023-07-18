import { GenericCredentialType, MetricType, PluginResult } from "@metrikube/common";
import { PluginAdapter, SetupPlugin } from "@metrikube/core";

export class SetupPluginUsecase implements SetupPlugin {

  constructor(private readonly pluginAdapter: PluginAdapter) { }

  async execute(pluginId: string, metricType: MetricType, credential: GenericCredentialType): Promise<PluginResult<typeof metricType>> {
    return this.pluginAdapter.setupPlugin<MetricType>({ pluginId, metricType, credential })
  }
}
