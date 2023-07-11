import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity'
import { Plugin } from '../../models/plugin.model'

export interface PluginRepository {
  getPlugins(): Promise<PluginEntity[]>

  createPlugin(plugin: Plugin): Promise<PluginEntity>
}
