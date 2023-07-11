import { PluginModel } from "../../domain/models/Plugin.model";

export interface FilterPluginsByCategory {
  execute: (providers: PluginModel[], pluginCategory: string) => PluginModel[]
}
