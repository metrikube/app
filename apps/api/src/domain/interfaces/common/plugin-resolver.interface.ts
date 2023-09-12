import { GenericCredentialType, MetricType, PluginConnectionInterface, PluginResult } from '@metrikube/common';

import { Plugin } from '../../models/plugin.model';

export interface PluginResolverInterface {
  resolvePluginConnector(pluginType: Plugin['type']): PluginConnectionInterface;

  testPluginConnection(plugin: Plugin, credentials: GenericCredentialType): Promise<{ ok: boolean; message: string }>;

  getConnectorByMetricType(type: MetricType): (credentials: GenericCredentialType) => Promise<PluginResult<MetricType>>;

  queryPluginDataByMetricType(type: MetricType, credentials: GenericCredentialType): Promise<PluginResult<MetricType>>;

  describeMetricTrackableFields(pluginType: string, metricType: MetricType): string[];
}
