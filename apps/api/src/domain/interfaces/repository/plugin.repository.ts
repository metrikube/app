import { Plugin } from '../../models/plugin.model';

export interface PluginRepository {
  getPlugins(): Promise<Plugin[]>;

  createPlugin(plugin: Plugin): Promise<Plugin>;

  findOneById(pluginId: string): Promise<Plugin>;
}
