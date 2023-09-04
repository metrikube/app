import { GenericCredentialType, MetricType, Plugin, PluginResult } from '@metrikube/common';

import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity';
import { PluginToMetricEntity } from '../../../infrastructure/database/entities/plugin_to_metric.entity';
import { PluginResponseDto } from '../../../presenter/plugin/dtos/plugins.dto';
import { RegisterPluginRequestDto, RegisterPluginResponseDto } from '../../../presenter/plugin/dtos/register-plugin.dto';

export interface PluginUseCaseInterface {
  create(plugin: Plugin): Promise<PluginEntity>;

  getPluginCredentials(pluginId: string): Promise<CredentialEntity>;

  getMetricMethodByMetricType(metricType: MetricType): (credentials: GenericCredentialType) => Promise<PluginResult<typeof metricType>>;

  listPlugins(): Promise<PluginResponseDto>;

  refreshPluginMetric(pluginId: PluginEntity['id'], pluginToMetricId: PluginToMetricEntity['id']): Promise<PluginResult<MetricType>>;

  registerPlugin(body: RegisterPluginRequestDto): Promise<RegisterPluginResponseDto>;
}
