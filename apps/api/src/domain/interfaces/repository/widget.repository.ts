import { FindManyOptions, FindOptionsWhere } from 'typeorm';

import { WidgetEntity } from '../../../infrastructure/database/entities/widget.entity';

export interface WidgetRepository {
  getWidgets(criterias: FindManyOptions<WidgetEntity> | FindOptionsWhere<WidgetEntity>): Promise<WidgetEntity[]>;

  findWidgetByPluginId(pluginId: string): Promise<WidgetEntity[]>;

  findById(optionsOrConditions: FindOptionsWhere<WidgetEntity>): Promise<WidgetEntity>;

  createWidget(payload): Promise<WidgetEntity>;
}
