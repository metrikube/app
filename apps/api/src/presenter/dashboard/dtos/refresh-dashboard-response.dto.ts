import { ApiProperty } from '@nestjs/swagger';

import { MetricType, PluginResult } from '@metrikube/common';

import { MetricEntity } from '../../../infrastructure/database/entities/metric.entity';
import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity';

class DashboardPluginDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  description: string;

  constructor(plugin: PluginEntity) {
    this.id = plugin.id;
    this.name = plugin.name;
    this.type = plugin.type;
    this.description = plugin.description;
  }
}

class DashboardMetricDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  isNotifiable: boolean;

  constructor(metric: MetricEntity) {
    this.id = metric.id;
    this.name = metric.name;
    this.type = metric.type;
    this.isNotifiable = metric.isNotifiable;
  }
}

export class RefreshDashboardResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: DashboardPluginDto })
  plugin: DashboardPluginDto;

  @ApiProperty({ type: DashboardMetricDto })
  metric: DashboardMetricDto;

  @ApiProperty()
  resourceId: string;

  @ApiProperty()
  data: PluginResult<MetricType>;

  constructor(id: string, plugin: PluginEntity, metric: MetricEntity, resourceId: string, data: PluginResult<MetricType>) {
    this.id = id;
    this.plugin = new DashboardPluginDto(plugin);
    this.metric = new DashboardMetricDto(metric);
    this.resourceId = resourceId;
    this.data = data;
  }
}
