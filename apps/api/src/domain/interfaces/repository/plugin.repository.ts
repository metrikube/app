import { Plugin } from '../../../infrastructure/database/entities/plugin.entity';

export interface PluginRepository {
  getPlugins(): Promise<Plugin[]>;
  createPlugin(plugin: Plugin): Promise<Plugin>;
}
