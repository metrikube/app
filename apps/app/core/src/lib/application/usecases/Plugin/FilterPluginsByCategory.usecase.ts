import type { PluginModel } from "@metrikube/core"

export class FilterPluginsByCategoryUsecase {
  execute(providers: PluginModel[], pluginCategory: string): PluginModel[] {
      if (!pluginCategory) {
        return providers
      }
    return providers.filter(plugin => plugin.category === pluginCategory)
  }
}
