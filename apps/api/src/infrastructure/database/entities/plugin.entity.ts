import { Column, CreateDateColumn, Entity, Generated, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { PluginToMetricEntity } from './plugin_to_metric.entity';

const pluginInstructionExample = `
  *1. Create an IAM user with the following permissions:*
      - AmazonEC2ReadOnlyAccess, AmazonS3ReadOnlyAccess, AmazonSNSReadOnlyAccess [...]
  *2. Create a new credential with the following parameters:*
  *3. Enjoy!*
`;

@Entity('plugin')
export class PluginEntity {
  @Generated('uuid')
  @PrimaryColumn({ type: 'uuid' })
  @ApiProperty({ name: 'id', type: String, description: 'Plugin id', example: 'fab8f183-7021-4a42-b429-447ee7415b93' })
  id: string;

  @ApiProperty({ name: 'name', type: String, description: 'Plugin name', example: 'AWS' })
  @Column()
  name: string;

  @Column()
  @ApiProperty({ name: 'type', type: String, description: 'Plugin type', example: 'aws' })
  type: string;

  @Column()
  @ApiProperty({ name: 'description', type: String, description: 'Plugin description', example: 'Plugin AWS' })
  description: string;

  @Column()
  @ApiProperty({ name: 'instruction', type: String, format: 'markdown', example: pluginInstructionExample })
  instruction: string;

  @Column()
  @ApiProperty({ name: 'category', type: String, description: 'Plugin category', example: 'cloud' })
  category: string;

  @JoinColumn()
  @OneToMany(() => PluginToMetricEntity, (pluginToMetric: PluginToMetricEntity) => pluginToMetric.plugin)
  @ApiProperty({
    name: 'pluginToMetrics',
    type: PluginToMetricEntity,
    isArray: true,
    description: 'Plugin available metrics'
  })
  pluginToMetrics: PluginToMetricEntity[];

  @CreateDateColumn()
  @ApiProperty({ name: 'createdAt', type: Date, description: 'Plugin creation date', example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;
}
