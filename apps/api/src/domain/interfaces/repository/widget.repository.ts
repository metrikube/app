import { Widget } from '../../models/widget.model';

export interface WidgetRepository {
  getActiveMetricsWithRelations(): Promise<Widget[]>;

  createwidget(widget: Partial<Omit<Widget, 'id'>>): Promise<Widget>;

  findwidgetById(id: string): Promise<Widget | undefined>;

  disablewidget(widgetId: string): Promise<Widget>;
}
