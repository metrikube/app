import { Plugin } from '../../../infrastructure/database/entities/plugin.entity';

export interface PluginUseCaseInterface {
  getPlugins(): Promise<Plugin[]>;
  create(plugin: Plugin): Promise<Plugin>;
}
