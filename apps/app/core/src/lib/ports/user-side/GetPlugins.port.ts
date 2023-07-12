import { PluginModel } from "../../domain";

export interface GetPlugins {
    execute: () => Promise<PluginModel[]>
}
