import { DataSource, FindManyOptions, FindOptionsWhere } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { Plugin } from '@metrikube/common';

import { PluginRepository } from '../../../domain/interfaces/repository/plugin.repository';
import { PluginEntity } from '../entities/plugin.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class PluginRepositoryImpl extends BaseRepository<PluginEntity> implements PluginRepository {
  constructor(@InjectDataSource() connection: DataSource) {
    super(connection, PluginEntity);
  }

  createPlugin(plugin: Plugin): Promise<PluginEntity> {
    return this.save(this.create(plugin));
  }

  findOneById(pluginId: string): Promise<PluginEntity> {
    return this.findOne({ where: { id: pluginId } });
  }

  getPlugins(criterias: FindManyOptions<PluginEntity> | FindOptionsWhere<PluginEntity>): Promise<PluginEntity[]> {
    return this.find(criterias);
  }
}
