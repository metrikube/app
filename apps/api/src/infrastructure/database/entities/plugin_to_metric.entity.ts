import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, RelationId } from 'typeorm';

import { CredentialEntity } from './credential.entity';
import { MetricEntity } from './metric.entity';
import { PluginEntity } from './plugin.entity';

@Entity('plugin_to_metric')
export class PluginToMetricEntity {
  @Generated('uuid')
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @ManyToOne(() => PluginEntity, (plugin: PluginEntity) => plugin.pluginToMetrics)
  @JoinColumn({ foreignKeyConstraintName: 'fk_plugin_id' })
  plugin: PluginEntity;

  @RelationId((pluginMetric: PluginToMetricEntity) => pluginMetric.plugin)
  @Column({ type: 'uuid', nullable: false })
  pluginId: string;

  @RelationId((pluginMetric: PluginToMetricEntity) => pluginMetric.credential)
  @Column({ type: 'uuid', nullable: false })
  credentialId: string;

  @JoinColumn({ foreignKeyConstraintName: 'fk_credential_id' })
  @ManyToOne(() => CredentialEntity, (credential: CredentialEntity) => credential.pluginToMetrics)
  credential: CredentialEntity;

  @ManyToOne(() => MetricEntity, (metric: MetricEntity) => metric.pluginToMetrics)
  @JoinColumn({ foreignKeyConstraintName: 'fk_metric_id' })
  metric: MetricEntity;

  @Column({ type: 'uuid', nullable: false })
  metricId: string;

  @Column({ type: 'varchar', nullable: true })
  resourceId: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
