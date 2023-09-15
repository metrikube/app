import { ApiProperty } from '@nestjs/swagger';

import { Alert } from '../../../domain/models/alert.model';

export class DashboardNotificationDto {
  @ApiProperty({ name: 'id', type: String, example: '010cdd16-f819-4ae3-af8e-41bc285feb49' })
  id: string;

  @ApiProperty({ name: 'title', type: String, example: 'Dépassement seuil de coûts' })
  title: string;

  @ApiProperty({ name: 'widgetName', type: String, example: '[PROD] Api Response Time' })
  widgetName: string;

  @ApiProperty({ name: 'description', type: String, example: "L'alerte se déclenche lorsque le {status} {operator} {value}" })
  description: string;

  @ApiProperty({ name: 'triggered', type: Boolean, example: true })
  triggered: boolean;

  constructor(alert: Alert) {
    this.id = alert.id;
    this.title = alert.label;
    this.widgetName = alert.widget.name;
    this.description = `L'alerte se déclenche lorsque ${alert.condition.field} ${alert.condition.operator} ${alert.condition.threshold}`;
    this.triggered = alert.triggered;
  }
}
