import { DataSource, FindManyOptions, FindOptionsWhere } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { WidgetRepository } from '../../../domain/interfaces/repository/widget.repository';
import { WidgetEntity } from '../entities/widget.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class WidgetRepositoryImpl extends BaseRepository<WidgetEntity> implements WidgetRepository {
  constructor(@InjectDataSource() connection: DataSource) {
    super(connection, WidgetEntity);
  }

  getWidgets(criterias: FindManyOptions<WidgetEntity> | FindOptionsWhere<WidgetEntity>): Promise<WidgetEntity[]> {
    return this.find(criterias);
  }

  findById(optionsOrConditions: FindOneOptions<WidgetEntity> | FindOptionsWhere<WidgetEntity>): Promise<WidgetEntity> {
    return this.findOne(optionsOrConditions);
  }

  findWidgetByPluginId(pluginId: string): Promise<WidgetEntity[]> {
    return this.find({ where: { plugin: { id: pluginId } } });
  }

  createWidget(payload): Promise<WidgetEntity> {
    return this.save(payload);
  }
}
