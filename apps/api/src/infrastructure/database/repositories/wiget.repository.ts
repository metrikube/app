import { DataSource } from 'typeorm';

import { InjectDataSource } from '@nestjs/typeorm';

import { WidgetRepository } from '../../../domain/interfaces/repository/widget.repository';
import { Widget } from '../../../domain/models/widget.model';
import { WidgetEntity } from '../entities/widget.entity';
import { BaseRepository } from './base.repository';

export class WidgetRepositoryImpl extends BaseRepository<WidgetEntity> implements WidgetRepository {
  constructor(@InjectDataSource() connection: DataSource) {
    super(connection, WidgetEntity);
  }

  async createwidget(payload: { metricId: string; pluginId: string; isActivated: boolean; resourceId?: string }) {
    const widget = await this.save(payload);
    return WidgetEntity.toModel(widget);
  }

  async getActiveMetricsWithRelations(): Promise<Widget[]> {
    const widgets = await this.find({
      isActive: true,
      relations: { plugin: true, metric: true }
    });
    return widgets.map(WidgetEntity.toModelDetailed);
  }

  disablewidget(widgetId: string): Promise<WidgetEntity> {
    return this.save({ id: widgetId, isActive: false });
  }

  async findwidgetById(id: string): Promise<Widget> {
    const widget = await this.findOne({
      where: { id },
      relations: {
        plugin: true,
        metric: true
      }
    });
    return WidgetEntity.toModelDetailed(widget);
  }
}
