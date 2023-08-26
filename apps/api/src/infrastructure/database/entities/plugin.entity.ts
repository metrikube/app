import { Column, CreateDateColumn, Entity, Generated, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

import { MetricEntity } from './metric.entity';
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
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  type: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false, default: 'No instruction' })
  instruction: string;

  @Column({ type: 'varchar', nullable: false })
  category: string;

  @JoinColumn()
  @OneToMany(() => PluginToMetricEntity, (pluginToMetric: PluginToMetricEntity) => pluginToMetric.plugin)
  pluginToMetrics: PluginToMetricEntity[];

  @JoinColumn()
  @OneToMany(() => MetricEntity, (metric: MetricEntity) => metric.plugin)
  metrics: MetricEntity;

  @Column({ type: 'varchar', nullable: false })
  credentialType: string;

  @Column({ type: 'varchar', nullable: true })
  iconUrl: string;

  @CreateDateColumn()
  createdAt: Date;
}
