import { PluginModel } from "../models"
import { Option } from "../valueObjects/Option.object"

const getCategoriesFromPluginList = (plugins: PluginModel[]): Set<Option> => {
  const categories = new Set<Option>()
  plugins.map(plugin => categories.add({ label: "", value: plugin.category}))
  return categories
}


export const usePluginHelper = () => {
  return {
    getCategoriesFromPluginList
  }
} 
