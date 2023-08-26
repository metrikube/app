import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { MetricThresholdOperator } from '@metrikube/common';

import { PluginToMetricEntity } from './plugin_to_metric.entity';

@Entity('alert')
export class AlertEntity {
  @Generated('uuid')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @Column({ default: false })
  triggered: boolean;

  @Column({ default: true, type: 'boolean' })
  isActive: boolean;

  @ManyToOne(() => PluginToMetricEntity, (pluginToMetric: PluginToMetricEntity) => pluginToMetric.metric)
  pluginToMetric: PluginToMetricEntity;

  @Column({ type: 'uuid', nullable: false })
  @RelationId((alert: AlertEntity) => alert.pluginToMetric)
  pluginToMetricId: PluginToMetricEntity['id'];

  @Column({ type: 'json' })
  condition: {
    field: string;
    operator: MetricThresholdOperator;
    threshold: string | number;
  };

  @CreateDateColumn()
  createdAt: Date;
}
