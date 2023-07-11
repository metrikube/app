import { DataSource } from 'typeorm'

import { Injectable } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'

import { PluginRepository } from '../../../domain/interfaces/repository/plugin.repository'
import { Plugin } from '../../../domain/models/plugin.model'
import { PluginEntity } from '../entities/plugin.entity'
import { BaseRepository } from './base.repository'

@Injectable()
export class PluginRepositoryImpl extends BaseRepository<PluginEntity> implements PluginRepository {
  constructor(@InjectDataSource() connection: DataSource) {
    super(connection, PluginEntity)
  }

  createPlugin(plugin: Plugin): Promise<PluginEntity> {
    return this.save(this.create(plugin))
  }

  getPlugins(): Promise<PluginEntity[]> {
    return this.find()
  }
}
