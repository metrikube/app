import { Plugin } from "../../models/plugin.model";


export interface PluginUseCaseInterface {
  getPluginById(id: string): Promise<Plugin>;
}
