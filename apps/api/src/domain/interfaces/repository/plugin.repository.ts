import { Plugin } from "../../models/plugin.model";


export interface PluginRepository {
  getPluginById(id: string): Promise<Plugin>;

  getPlugins(): Promise<Plugin[]>;

  createPlugin(plugin: Plugin): Promise<Plugin>;

  updatePlugin(plugin: Plugin): Promise<Plugin>;

  deletePlugin(id: string): Promise<Plugin>;
}
