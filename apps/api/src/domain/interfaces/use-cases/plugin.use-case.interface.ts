import { MetricType, PluginResult } from '@metrikube/common';

import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity';
import { WidgetEntity } from '../../../infrastructure/database/entities/widget.entity';
import { PluginResponseDto } from '../../../presenter/plugin/dtos/plugins.dto';
import { RegisterPluginRequestDto, RegisterPluginResponseDto } from '../../../presenter/plugin/dtos/register-plugin.dto';
import { Credential } from '../../models/credential.model';
import { Plugin } from '../../models/plugin.model';

export interface PluginUseCaseInterface {
  create(plugin: Plugin): Promise<Plugin>;

  getPluginCredentials(pluginId: string): Promise<Credential>;

  listPlugins(): Promise<PluginResponseDto>;

  refreshPluginMetric(pluginId: PluginEntity['id'], widgetId: WidgetEntity['id']): Promise<PluginResult<MetricType>>;

  registerPlugin(body: RegisterPluginRequestDto): Promise<RegisterPluginResponseDto>;

  getPluginTrackableFieldsByMetricId(metricId: string): Promise<string[]>;
}
