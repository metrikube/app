import { MetricThresholdOperator } from '@metrikube/common';

import { Widget } from './widget.model';

export class Alert {
  public widget?: Widget;

  // prettier-ignore
  constructor(
    public id: string,
    public label: string,
    public widgetId: Widget['id'],
    public isActive: boolean,
    public triggered: boolean,
    public triggeredAt: Date,
    public condition: {
      field: string;
      operator: MetricThresholdOperator;
      threshold: string | number;
    }
  ) {
  }
}
