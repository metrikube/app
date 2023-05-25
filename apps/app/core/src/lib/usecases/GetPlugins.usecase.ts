import type { PluginAdapter } from "../ports/server-side/PluginAdapter.port";
import type { GetPlugins } from "../ports/user-side/GetPlugins.port";

export class GetPluginsUsecase implements GetPlugins {

    constructor(private readonly pluginAdapter: PluginAdapter) { }

    async execute(): Promise<{ id: string, name: string }[]> {
        return Promise.resolve([
            {
                id: "test-1",
                name: "AWS"
            },
            {
                id: "test-2",
                name: "Github"
            }
        ])
    }
}