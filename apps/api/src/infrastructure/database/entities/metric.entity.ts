import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, RelationId } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

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
  @ManyToOne(() => PluginEntity, (plugin: PluginEntity) => plugin.id)
  @ApiProperty({ name: 'plugin', type: PluginEntity, description: 'Metric plugins' })
  plugin: PluginEntity;

  // @Column({ type: 'uuid', nullable: false })
  @RelationId((metric: MetricEntity) => metric.plugin)
  @Column({ type: 'uuid', nullable: false })
  @ApiProperty({ name: 'pluginId', type: String, description: 'Metric plugin id', example: 'fab8f183-7021-4a42-b429-447ee7415b93' })
  pluginId: PluginEntity['id'];

  @Column({ name: 'type', type: 'varchar', nullable: false })
  @ApiProperty({ name: 'type', type: String, description: 'Metric type', example: 'aws_single_instance_cost' })
  type: string;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  @ApiProperty({
    name: 'name',
    type: String,
    description: 'Metric name',
    example: 'EC2 Instance usage'
  })
  name: string;

  @Column({ name: 'refreshInterval', type: 'integer', default: 60, nullable: false })
  @ApiProperty({
    name: 'refreshInterval',
    type: Number,
    description: 'Metric refresh interval in seconds',
    example: 60
  })
  refreshInterval: number;

  @JoinColumn()
  @OneToMany(() => PluginToMetricEntity, (pluginToMetric: PluginToMetricEntity) => pluginToMetric.metric)
  @ApiProperty({
    name: 'pluginToMetrics',
    type: PluginToMetricEntity,
    isArray: true,
    description: 'Plugin available metrics'
  })
  pluginToMetrics: PluginToMetricEntity[];

  @Column({ name: 'isNotifiable', type: 'boolean', default: false, nullable: false })
  @ApiProperty({
    name: 'isNotifiable',
    type: Boolean,
    default: false,
    description: 'Metric is notifiable',
    example: false
  })
  isNotifiable: boolean;

  @CreateDateColumn()
  @ApiProperty({
    name: 'createdAt',
    type: Date,
    description: 'Plugin creation date',
    example: '2023-01-01T00:00:00.000Z'
  })
  createdAt: Date;
}
