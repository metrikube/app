import { Type } from 'class-transformer';
import { IsDefined, IsEnum, IsNotEmpty, IsNotEmptyObject, IsString, IsUUID, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { MetricThresholdOperatorEnum } from '../../../domain/models/alert.model';
import { AlertEntity } from '../../../infrastructure/database/entities/alert.entity';

class AlertRequestCondition {
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
  @Type(() => AlertRequestCondition)
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
  readonly condition: AlertRequestCondition;
}

export class CreateAlertResponseDto {
  @ApiProperty({ name: 'label', type: String, example: 'Alerte lorsque le temps de réponse est > 100ms' })
  label: string;
  @ApiProperty({ name: 'id', type: String, example: 'da703afc-daef-4bf1-8179-649454724d96' })
  id: string;
  @ApiProperty({ name: 'pluginToMetricId', type: String, example: '3bb59e4c-271a-4b2a-b932-3c6578d9f52e' })
  pluginToMetricId: string;

  constructor(alert: AlertEntity) {
    this.label = alert.label;
    this.id = alert.id;
    this.pluginToMetricId = alert.pluginToMetricId;
  }
}
