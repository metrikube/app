import type { PluginAdapter, PluginModel } from "@metrikube/core";

export class GetPluginsUsecase {

    constructor(private readonly pluginAdapter: PluginAdapter) { }

    async execute(): Promise<PluginModel[]> {
        return this.pluginAdapter.getPlugins()
    }
}
