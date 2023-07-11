import { AWSService } from '@metrikube/aws-plugin'
import { MetricType, PluginResult } from '@metrikube/common'

import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity'
import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity'
import { Plugin } from '../../models/plugin.model'

export interface PluginUseCaseInterface {
  create(plugin: Plugin): Promise<PluginEntity>

  getAWSPlugin(): AWSService

  getPluginCredentials(pluginId: string): Promise<CredentialEntity>

  getPlugins(): Promise<PluginEntity[]>

  refreshPluginMetric(pluginId: string, metric: string): PluginResult<MetricType>
}
