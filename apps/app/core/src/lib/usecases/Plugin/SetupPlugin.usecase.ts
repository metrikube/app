import { GenericCredentialType, MetricType } from "@metrikube/common";
import { PluginAdapter, SetupPlugin } from "@metrikube/core";

export class SetupPluginUsecase implements SetupPlugin {

  constructor(private readonly pluginAdapter: PluginAdapter) { }

  async execute(pluginId: string, metricType: MetricType, credential: GenericCredentialType): Promise<unknown> {
    return this.pluginAdapter.setupPlugin({pluginId, metricType, credential})
  }
}
