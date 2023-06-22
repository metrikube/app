import { Column, CreateDateColumn, Entity, Generated, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { AlertEntity } from './alert.entity';
import { PluginEntity } from './plugin.entity';

@Entity('widget')
export class WidgetEntity {
  @Generated('uuid')
  @PrimaryColumn('uuid')
  @ApiProperty({ name: 'id', type: String, description: 'Widget id', example: 'fab8f183-7021-4a42-b429-447ee7415b93' })
  id: string;

  @Column()
  @ApiProperty({ name: 'type', type: String, description: 'Widget type', example: 'aws_single_instance_cost' })
  type: string;

  @Column()
  @ApiProperty({ name: 'name', type: String, description: 'Widget name', example: 'EC2 Instance usage' })
  name: string;

  @Column()
  @ApiProperty({ name: 'refreshInterval', type: Number, description: 'Widget refresh interval', example: 60 })
  refreshInterval: number; // in seconds

  @OneToOne(() => PluginEntity)
  @JoinColumn()
  @ApiProperty({ name: 'plugin', type: PluginEntity, isArray: true, description: 'Widget plugins' })
  plugin: PluginEntity;

  @OneToOne(() => AlertEntity, { cascade: ['insert'] })
  @JoinColumn()
  @ApiProperty({ name: 'alert', type: 'AlertEntity', description: 'Widget alert' })
  alert: AlertEntity;

  @CreateDateColumn()
  @ApiProperty({ name: 'createdAt', type: Date, description: 'Plugin creation date', example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;
}
