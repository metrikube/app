import { Column, CreateDateColumn, Entity, Generated, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { AlertEntity } from './alert.entity';
import { PluginEntity } from './plugin.entity';

@Entity('metric')
export class MetricEntity {
  @Generated('uuid')
  @PrimaryColumn('uuid')
  @ApiProperty({ name: 'id', type: String, description: 'Metric id', example: 'fab8f183-7021-4a42-b429-447ee7415b93' })
  id: string;

  @Column()
  @ApiProperty({ name: 'type', type: String, description: 'Metric type', example: 'aws_single_instance_cost' })
  type: string;

  @Column()
  @ApiProperty({ name: 'name', type: String, description: 'Metric name', example: 'EC2 Instance usage' })
  name: string;

  @Column()
  @ApiProperty({ name: 'resourceId', type: String, description: 'Metric tracked resource id', example: 'i-0c1f7d7e0e7f3e7f3' })
  resourceId: string;

  @Column({ default: 15 })
  @ApiProperty({ name: 'refreshInterval', type: Number, description: 'Metric refresh interval', example: 15, default: 15 })
  refreshInterval: number; // in seconds

  @OneToOne(() => PluginEntity)
  @JoinColumn()
  @ApiProperty({ name: 'plugin', type: PluginEntity, isArray: true, description: 'Metric plugins' })
  plugin: PluginEntity;

  @OneToOne(() => AlertEntity, { cascade: ['insert'] })
  @JoinColumn()
  @ApiProperty({ name: 'alert', type: 'AlertEntity', description: 'Metric alert' })
  alert: AlertEntity;

  @CreateDateColumn()
  @ApiProperty({ name: 'createdAt', type: Date, description: 'Plugin creation date', example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;
}
