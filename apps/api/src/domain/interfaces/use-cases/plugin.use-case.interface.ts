import { AWSService } from '@metrikube/aws-plugin';
import { MetricType, PluginResult, Plugin } from '@metrikube/common';

import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity';
import { PluginResponseDto } from '../../../presenter/dto/plugins.dto';

export interface PluginUseCaseInterface {
  create(plugin: Plugin): Promise<PluginEntity>;

  getAWSPlugin(): AWSService;

  getPluginCredentials(pluginId: string): Promise<CredentialEntity>;

  listPlugins(): Promise<PluginResponseDto>;

  refreshPluginMetric(pluginId: string, metric: string): PluginResult<MetricType>;
}
