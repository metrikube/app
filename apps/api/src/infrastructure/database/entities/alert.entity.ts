import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { MetricThresholdOperator } from '../../../domain/models/alert.model';
import { MetricEntity } from './metric.entity';

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

  @ManyToOne(() => MetricEntity, (metric) => metric.alerts)
  metric: MetricEntity;

  @RelationId((alert: AlertEntity) => alert.metric)
  metricId: MetricEntity['id'];

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
