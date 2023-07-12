import { Plugin } from '@metrikube/common';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';

import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity';

export interface PluginRepository {
  getPlugins(criterias?: FindManyOptions<PluginEntity> | FindOptionsWhere<PluginEntity>): Promise<PluginEntity[]>;

  createPlugin(plugin: Plugin): Promise<PluginEntity>;

  findOneById(pluginId: string): Promise<PluginEntity>;
}
