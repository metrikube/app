import { DataSource, FindManyOptions, FindOptionsWhere } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { MetricType } from '@metrikube/common';

import { MetricRepository } from '../../../domain/interfaces/repository/metric.repository';
import { Metric } from '../../../domain/models/metric.model';
import { MetricEntity } from '../entities/metric.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class MetricRepositoryImpl extends BaseRepository<MetricEntity> implements MetricRepository {
  constructor(@InjectDataSource() connection: DataSource) {
    super(connection, MetricEntity);
  }

  async getMetrics(criterias: FindManyOptions<MetricEntity> | FindOptionsWhere<MetricEntity>): Promise<Metric[]> {
    const metrics = await this.find(criterias);
    return metrics.map(MetricEntity.toModel);
  }

  async findById(id: string): Promise<Metric> {
    const metric = await this.findOne({
      where: { id },
      relations: { plugin: true }
    });
    return MetricEntity.toModelDetailed(metric);
  }

  async findMetricByPluginId(pluginId: string): Promise<Metric[]> {
    const metrics = await this.find({ where: { plugin: { id: pluginId } } });
    return metrics.map(MetricEntity.toModel);
  }

  async findMetricByType(pluginId: string, type: MetricType): Promise<Metric> {
    const metric = await this.findOne({
      where: { type, plugin: { id: pluginId } },
      relations: { widgets: true }
    });
    return MetricEntity.toModelDetailed(metric);
  }
}
