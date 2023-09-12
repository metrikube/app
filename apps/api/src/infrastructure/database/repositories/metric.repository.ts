import { DataSource, FindManyOptions, FindOptionsWhere } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { MetricType } from '@metrikube/common';

import { MetricRepository } from '../../../domain/interfaces/repository/metric.repository';
import { MetricEntity } from '../entities/metric.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class MetricRepositoryImpl extends BaseRepository<MetricEntity> implements MetricRepository {
  constructor(@InjectDataSource() connection: DataSource) {
    super(connection, MetricEntity);
  }

  getMetrics(criterias: FindManyOptions<MetricEntity> | FindOptionsWhere<MetricEntity>): Promise<MetricEntity[]> {
    return this.find(criterias);
  }

  findById(id: string): Promise<MetricEntity> {
    return this.findOne({
      where: { id },
      relations: { plugin: true }
    });
  }

  findMetricByPluginId(pluginId: string): Promise<MetricEntity[]> {
    return this.find({ where: { plugin: { id: pluginId } } });
  }

  findMetricByType(pluginId: string, type: MetricType): Promise<MetricEntity> {
    return this.findOne({
      where: { type, plugin: { id: pluginId } },
      relations: { widgets: true }
    });
  }
}
