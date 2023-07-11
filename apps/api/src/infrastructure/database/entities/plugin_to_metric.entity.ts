import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, RelationId } from 'typeorm';

import { MetricEntity } from './metric.entity';
import { PluginEntity } from './plugin.entity';

@Entity('plugin_to_metric')
export class PluginToMetricEntity {
  @Generated('uuid')
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id: string;

  @ManyToOne(() => PluginEntity, (plugin: PluginEntity) => plugin.pluginToMetrics)
  @JoinColumn()
  plugin: PluginEntity;

  @RelationId((pluginMetric: PluginToMetricEntity) => pluginMetric.plugin)
  @Column({ type: 'uuid', nullable: false })
  pluginId: string;

  @ManyToOne(() => MetricEntity, (metric: MetricEntity) => metric.pluginToMetrics)
  @JoinColumn()
  metric: MetricEntity;

  @Column({ type: 'uuid', nullable: false })
  metricId: string;

  @Column({ type: 'varchar', nullable: false })
  ressourceId: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
