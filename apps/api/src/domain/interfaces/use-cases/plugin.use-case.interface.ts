import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity';
import { Plugin } from '../../models/plugin.model';

export interface PluginUseCaseInterface {
  getPlugins(): Promise<PluginEntity[]>;

  create(plugin: Plugin): Promise<PluginEntity>;
}
