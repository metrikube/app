import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsOptional, IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { GenericCredentialType, MetricType, PluginResult } from '@metrikube/common';

import { Widget } from '../../../domain/models/widget.model';
import { WidgetEntity } from '../../../infrastructure/database/entities/widget.entity';

export class RegisterPluginRequestDto {
  @ApiProperty({
    type: Object,
    name: 'credential',
    description: 'The credential to use to connect to the plugin',
    example: {
      apiEndpoint: 'https://httpstat.us/200'
    }
  })
  @IsDefined()
  @IsNotEmptyObject()
  credential: GenericCredentialType;

  @ApiProperty({ type: String, name: 'pluginId', description: 'The id of the plugin to register', example: 'da3439fd-f637-409c-8267-655a03a2e915' })
  @IsUUID()
  @IsNotEmpty()
  pluginId: string;

  @ApiProperty({ type: String, name: 'name', description: 'The name of the widget to register', example: 'My Backend Ping Check' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, name: 'metricType', description: 'The type of the metric to register', example: 'api-endpoint-health-check' })
  @IsNotEmpty()
  metricType: MetricType;

  @ApiProperty({ type: String, name: 'resourceId', description: 'The id of the ressource to register if we need to connect to a specific ressource', example: 'i-0f4c2b6b2b2a1c2d3' })
  @IsOptional()
  resourceId?: string;
}

export class RegisterPluginResponseDto {
  @ApiProperty({
    type: String,
    name: 'id',
    description: 'The id of the created widget entity, it represents the connected metric in the dashboard',
    example: '1fe68a45-b3a1-44a5-bf87-7393cfa4017a'
  })
  public id: string;

  @ApiProperty({
    type: Object,
    name: 'data',
    description: 'The data to send to the plugin',
    example: {
      status: 200,
      value: 75,
      unit: 'ms',
      details: 'Api responded with status 200 in 75ms'
    }
  })
  data: PluginResult<MetricType>;

  constructor(widget: Widget | null, metricDataSample: PluginResult<MetricType>) {
    this.id = widget?.id ?? null;
    this.data = metricDataSample;
  }
}
