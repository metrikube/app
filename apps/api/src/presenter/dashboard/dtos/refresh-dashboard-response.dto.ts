import { ApiProperty } from '@nestjs/swagger';

import { MetricType, PluginResult } from '@metrikube/common';

import { ActivatedMetric } from '../../../application/use-cases/dashboard/dashboard.use-case';
import { Metric } from '../../../domain/models/metric.model';
import { Plugin } from '../../../domain/models/plugin.model';
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

  constructor(plugin: Plugin) {
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

  constructor(metric: Metric) {
    this.id = metric.id;
    this.name = metric.name;
    this.type = metric.type;
    this.isNotifiable = metric.isNotifiable;
  }
}

export class RefreshDashboardResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  alertNumber: number;

  @ApiProperty({ type: DashboardPluginDto })
  plugin: DashboardPluginDto;

  @ApiProperty({ type: DashboardMetricDto })
  metric: DashboardMetricDto;

  @ApiProperty()
  resourceId: string;

  @ApiProperty()
  data: PluginResult<MetricType>;

  constructor(activatedMetric: ActivatedMetric, data: PluginResult<MetricType>) {
    this.id = activatedMetric.id;
    this.name = activatedMetric.name;
    this.alertNumber = activatedMetric.alerts.length;
    this.plugin = new DashboardPluginDto(activatedMetric.plugin);
    this.metric = new DashboardMetricDto(activatedMetric.metric);
    this.resourceId = activatedMetric.resourceId;
    this.data = data;
  }
}
