import { Type } from 'class-transformer';
import { IsDefined, IsEnum, IsNotEmpty, IsNotEmptyObject, IsString, IsUUID, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { MetricThresholdOperatorEnum } from '../../../domain/models/alert.model';
import { AlertEntity } from '../../../infrastructure/database/entities/alert.entity';

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
    pluginToMetricId: string;
  }[];

  constructor(alerts: AlertEntity[]) {
    this.alerts = alerts.map((alert) => ({
      label: alert.label,
      id: alert.id,
      pluginToMetricId: alert.pluginToMetricId
    }));
  }
}
