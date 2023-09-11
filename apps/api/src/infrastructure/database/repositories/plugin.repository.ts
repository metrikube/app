import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { PluginRepository } from '../../../domain/interfaces/repository/plugin.repository';
import { Plugin } from '../../../domain/models/plugin.model';
import { PluginEntity } from '../entities/plugin.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class PluginRepositoryImpl extends BaseRepository<PluginEntity> implements PluginRepository {
  constructor(@InjectDataSource() connection: DataSource) {
    super(connection, PluginEntity);
  }

  async createPlugin(pluginToInsert: Plugin): Promise<Plugin> {
    const plugin: PluginEntity = await this.save(this.create(pluginToInsert));
    return PluginEntity.toModel(plugin);
  }

  async findOneById(pluginId: string): Promise<Plugin> {
    const plugin = await this.findOne({ where: { id: pluginId } });
    return PluginEntity.toModel(plugin);
  }

  async getPlugins(): Promise<Plugin[]> {
    const plugins = await this.find({
      relations: {
        metrics: true,
        widgets: true
      }
    });
    return plugins.map((p) => PluginEntity.toModelDetailed(p));
  }
}
