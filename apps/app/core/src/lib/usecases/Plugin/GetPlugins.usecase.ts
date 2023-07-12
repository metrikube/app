import type { PluginModel } from "../../domain";
import type { PluginAdapter } from "../../ports/server-side/PluginAdapter.port";
import type { GetPlugins } from "../../ports/user-side/GetPlugins.port";

export class GetPluginsUsecase implements GetPlugins {

    constructor(private readonly pluginAdapter: PluginAdapter) { }

    async execute(): Promise<PluginModel[]> {
        return this.pluginAdapter.getPlugins()
    }
}
