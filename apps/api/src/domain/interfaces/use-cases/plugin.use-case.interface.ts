import { AWSService } from '@metrikube/aws-plugin'

import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity'
import { Plugin } from '../../models/plugin.model'

export interface PluginUseCaseInterface {
  getPlugins(): Promise<PluginEntity[]>
  getAWSPlugin(): AWSService
  create(plugin: Plugin): Promise<PluginEntity>
}
