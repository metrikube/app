import { FindManyOptions, FindOptionsWhere } from 'typeorm';

import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity';
import { Plugin } from '../../models/plugin.model';

export interface PluginRepository {
  getPlugins(criterias: FindManyOptions<PluginEntity> | FindOptionsWhere<PluginEntity>): Promise<PluginEntity[]>;

  createPlugin(plugin: Plugin): Promise<PluginEntity>;
}
