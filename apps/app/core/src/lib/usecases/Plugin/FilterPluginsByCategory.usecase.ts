import { PluginModel } from "../../domain/models/Plugin.model"
import { FilterPluginsByCategory } from "../../ports/user-side/FilterPluginsByCategory.port"

export class FilterPluginsByCategoryUsecase implements FilterPluginsByCategory {
  execute(providers: PluginModel[], pluginCategory: string): PluginModel[] {
      if (!pluginCategory) {
        return providers
      }
    return providers.filter(plugin => plugin.category === pluginCategory)
  }
}
