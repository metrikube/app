import { DataSource } from 'typeorm';

import { InjectDataSource } from '@nestjs/typeorm';

import { PluginToMetricRepository } from '../../../domain/interfaces/repository/plugin-to-metric.repository';
import { PluginToMetricEntity } from '../entities/plugin_to_metric.entity';
import { BaseRepository } from './base.repository';

export class PluginToMetricRepositoryImpl extends BaseRepository<PluginToMetricEntity> implements PluginToMetricRepository {
  constructor(@InjectDataSource() connection: DataSource) {
    super(connection, PluginToMetricEntity);
  }

  createPluginToMetric(payload: { metricId: string; pluginId: string; isActivated: boolean; resourceId?: string }): Promise<PluginToMetricEntity> {
    return this.save(payload);
  }

  getActiveMetrics(): Promise<PluginToMetricEntity> {
    throw new Error('Method not implemented.');
  }
}
