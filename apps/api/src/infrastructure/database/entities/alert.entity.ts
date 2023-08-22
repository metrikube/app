import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { MetricThresholdOperator } from '@metrikube/common';

import { PluginToMetricEntity } from './plugin_to_metric.entity';

@Entity('alert')
export class AlertEntity {
  @Generated('uuid')
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    name: 'id',
    type: String,
    description: 'Alert id',
    example: 'fab8f183-7021-4a42-b429-447ee7415b93'
  })
  id: string;

  @Column()
  @ApiProperty({
    name: 'label',
    type: String,
    description: 'Alert label',
    example: 'EC2 Instance usage alert when cost is greater than 100$'
  })
  label: string;

  @Column({ default: false })
  @ApiProperty({
    name: 'triggered',
    type: Boolean,
    description: 'Alert triggered,' + 'used to avoid multiple notifications',
    example: false
  })
  triggered: boolean;

  @Column({ default: true, type: 'boolean' })
  @ApiProperty({
    name: 'isActive',
    type: Boolean,
    description: 'is alert active',
    example: true
  })
  isActive: boolean;

  @ManyToOne(() => PluginToMetricEntity, (pluginToMetric: PluginToMetricEntity) => pluginToMetric.metric)
  pluginToMetric: PluginToMetricEntity;

  @Column({ type: 'uuid', nullable: false })
  @RelationId((alert: AlertEntity) => alert.pluginToMetric)
  pluginToMetricId: PluginToMetricEntity['id'];

  @Column({ type: 'json' })
  @ApiProperty({
    name: 'condition',
    type: 'json',
    description: 'Alert condition'
  })
  condition: {
    field: string;
    operator: MetricThresholdOperator;
    threshold: string | number;
  };

  @CreateDateColumn()
  @ApiProperty({
    name: 'createdAt',
    type: Date,
    description: 'Plugin creation date',
    example: '2023-01-01T00:00:00.000Z'
  })
  createdAt: Date;
}
