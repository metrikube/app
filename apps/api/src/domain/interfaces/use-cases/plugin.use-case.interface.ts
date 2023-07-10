import { MetricType, PluginResult } from '@metrikube/common';

import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity';
import { Plugin } from '../../models/plugin.model';

export interface PluginUseCaseInterface {
  getPlugins(): Promise<PluginEntity[]>;

  create(plugin: Plugin): Promise<PluginEntity>;

  getAWSPlugin(): any;

  getPluginCredentials(pluginId: string): Promise<CredentialEntity>;

  refreshPluginMetric(pluginId: string, metric: string): PluginResult<MetricType>;
}
