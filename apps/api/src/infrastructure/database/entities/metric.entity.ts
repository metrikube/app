import { Column, CreateDateColumn, Entity, Generated, JoinColumn, OneToMany, OneToOne, PrimaryColumn, RelationId } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { AlertEntity } from './alert.entity';
import { PluginEntity } from './plugin.entity';
import { PluginToMetricEntity } from './plugin_to_metric.entity';

@Entity('metric')
export class MetricEntity {
  @Generated('uuid')
  @PrimaryColumn('uuid')
  @ApiProperty({
    name: 'id',
    type: String,
    description: 'Metric id',
    example: 'fab8f183-7021-4a42-b429-447ee7415b93'
  })
  id: string;

  @JoinColumn()
  @OneToOne(() => PluginEntity, (plugin: PluginEntity) => plugin.id)
  @ApiProperty({
    name: 'plugin',
    type: PluginEntity,
    isArray: true,
    description: 'Metric plugins'
  })
  plugin: PluginEntity;

  @RelationId((metric: MetricEntity) => metric.plugin)
  @ApiProperty({
    name: 'pluginId',
    type: String,
    description: 'Metric plugin id',
    example: 'fab8f183-7021-4a42-b429-447ee7415b93'
  })
  pluginId: PluginEntity['id'];

  @JoinColumn()
  @OneToMany(() => AlertEntity, (alert: AlertEntity) => alert.metric)
  alerts: AlertEntity[];

  @Column()
  @ApiProperty({
    name: 'type',
    type: String,
    description: 'Metric type',
    example: 'aws_single_instance_cost'
  })
  type: string;

  @Column()
  @ApiProperty({
    name: 'name',
    type: String,
    description: 'Metric name',
    example: 'EC2 Instance usage'
  })
  name: string;

  @OneToMany(() => PluginToMetricEntity, (pluginToMetric: PluginToMetricEntity) => pluginToMetric.metric)
  @JoinColumn()
  @ApiProperty({
    name: 'pluginToMetrics',
    type: PluginToMetricEntity,
    isArray: true,
    description: 'Plugin available metrics'
  })
  pluginToMetrics: PluginToMetricEntity[];

  @CreateDateColumn()
  @ApiProperty({
    name: 'createdAt',
    type: Date,
    description: 'Plugin creation date',
    example: '2023-01-01T00:00:00.000Z'
  })
  createdAt: Date;
}
