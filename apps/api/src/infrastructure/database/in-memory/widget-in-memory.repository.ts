import { WidgetRepository } from '../../../domain/interfaces/repository/widget.repository';
import { WidgetEntity } from '../entities/widget.entity';

export class WidgetInMemoryRepositoryImpl implements WidgetRepository {
  widgets = [{ id: '1', isActive: true, metricId: 'metric-id', pluginId: 'plugin-id', resourceId: 'resource-id', plugin: { name: 'test-plugin' }, metric: { name: 'test-metric' } }] as WidgetEntity[];

  constructor() {}

  createwidget(param: { metricId: string; pluginId: string; isActivated: boolean; resourceId?: string }): Promise<WidgetEntity> {
    const widget = {
      id: '1',
      isActive: true,
      metricId: 'metric-id',
      pluginId: 'plugin-id',
      resourceId: param?.resourceId
    } as WidgetEntity;
    this.widgets.push(widget);
    return Promise.resolve(widget as WidgetEntity);
  }

  async deleteWidget(widgetId: string): Promise<void> {
    const index = this.widgets.findIndex((widget) => widget.id === widgetId);
    if (index !== -1) this.widgets.splice(index, 1);
  }

  findwidgetById(id: string): Promise<WidgetEntity> {
    return Promise.resolve(this.widgets.find((widget) => widget.id === id));
  }

  getActiveMetricsWithRelations(): Promise<WidgetEntity[]> {
    return Promise.resolve(this.widgets);
  }

  disablewidget(widgetId: string): Promise<WidgetEntity> {
    const p = this.widgets.find((widget) => widget.id === widgetId);
    p.isActive = false;
    return Promise.resolve(p);
  }
}
