import type { GenericCredentialType, MetricType, PluginResult } from '@metrikube/common';
import { PluginAdapter } from '@metrikube/core';

export class SetupWidgetUsecase {
  constructor(private readonly pluginAdapter: PluginAdapter) { }

  async execute(pluginId: string, name: string, metricType: MetricType, credential: GenericCredentialType): Promise<PluginResult<typeof metricType>> {
    return this.pluginAdapter.setupWidget<MetricType>({ pluginId, name, metricType, credential });
  }
}
