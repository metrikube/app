import { Type } from 'class-transformer';
import { IsDefined, IsEnum, IsNotEmpty, IsNotEmptyObject, IsString, IsUUID, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { MetricThresholdOperatorEnum } from '@metrikube/common';

import { Alert } from '../../../domain/models/alert.model';

class AlertConditionRequestDto {
  @ApiProperty({ name: 'field', type: String, description: 'The field to check', example: 'value' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  field: string; // 'value' | 'status' | 'cost' | 'duration' ...

  @ApiProperty({ name: 'operator', enum: MetricThresholdOperatorEnum, description: 'The operator to use', example: 'gt' })
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(MetricThresholdOperatorEnum)
  operator: MetricThresholdOperatorEnum;

  @ApiProperty({ name: 'threshold', description: 'The threshold to trigger the alert', example: '100' })
  @IsNotEmpty()
  @IsDefined()
  threshold: string | number;
}

export class CreateAlertRequestDto {
  @ApiProperty({ name: 'label', type: String, description: 'The label of the alert', example: 'Alerte lorsque le temps de réponse est > 100ms', required: true })
  @IsString()
  @IsNotEmpty()
  readonly label: string;

  @ApiProperty({ name: 'metricId', type: String, description: 'The metric id linked to the alert', example: 'a91f4eda-8e3a-48f4-ba39-f40735352a61', required: true })
  @IsUUID()
  @IsNotEmpty()
  readonly metricId: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => AlertConditionRequestDto)
  @ApiProperty({
    name: 'condition',
    description: 'The condition to trigger the alert',
    example: {
      field: 'value',
      operator: 'gt',
      threshold: 100
    },
    required: true
  })
  readonly condition: AlertConditionRequestDto;
}

export class CreateAlertResponseDto {
  @ApiProperty({ name: 'alerts', type: Object })
  alerts: {
    label: string;
    id: string;
    widgetId: string;
  }[];

  constructor(alerts: Alert[]) {
    this.alerts = alerts.map((alert) => ({
      label: alert.label,
      id: alert.id,
      widgetId: alert.widgetId
    }));
  }
}
