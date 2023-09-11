import { Injectable } from '@nestjs/common';

import { PluginRepository } from '../../../domain/interfaces/repository/plugin.repository';
import { Plugin } from '../../../domain/models/plugin.model';
import { PluginEntity } from '../entities/plugin.entity';

@Injectable()
export class PluginInMemoryRepositoryImpl implements PluginRepository {
  db: PluginEntity[] = [];

  constructor() {}

  createPlugin(plugin: Plugin): Promise<PluginEntity> {
    this.db.push(plugin as unknown as PluginEntity);
    return Promise.resolve(plugin as unknown as PluginEntity);
  }

  getPlugins(): Promise<PluginEntity[]> {
    return Promise.resolve(this.db);
  }

  findPluginByIdWithCredential(id: string): Promise<PluginEntity> {
    return Promise.resolve(this.db.find((plugin) => plugin.id === id));
  }

  findOneById(pluginId: string): Promise<PluginEntity> {
    return Promise.resolve(this.db.find((plugin) => plugin.id === pluginId));
  }
}
