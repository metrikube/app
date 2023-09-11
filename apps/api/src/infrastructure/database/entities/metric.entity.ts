import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, RelationId } from 'typeorm';

import { MetricType } from '@metrikube/common';

import { Metric } from '../../../domain/models/metric.model';
import { PluginEntity } from './plugin.entity';
import { WidgetEntity } from './widget.entity';

@Entity('metric')
export class MetricEntity {
  @Generated('uuid')
  @PrimaryColumn('uuid')
  id: string;

  @JoinColumn({ foreignKeyConstraintName: 'fk_metric_plugin_id' })
  @ManyToOne(() => PluginEntity, (plugin: PluginEntity) => plugin.id)
  plugin: PluginEntity;

  @RelationId((metric: MetricEntity) => metric.plugin)
  @Column({ type: 'uuid', nullable: false })
  pluginId: PluginEntity['id'];

  @Column({ name: 'type', type: 'varchar', nullable: false })
  type: MetricType;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'refreshInterval', type: 'integer', default: 59, nullable: false })
  refreshInterval: number;

  @JoinColumn()
  @OneToMany(() => WidgetEntity, (widget: WidgetEntity) => widget.metric)
  widgets: WidgetEntity[];

  @Column({ name: 'isNotifiable', type: 'boolean', default: false, nullable: false })
  isNotifiable: boolean;

  @CreateDateColumn()
  createdAt: Date;

  static toModel(entity: MetricEntity): Metric {
    return new Metric(entity.id, entity.name, entity.type, entity.refreshInterval, entity.isNotifiable, entity.pluginId);
  }

  static toModelDetailed(entity: MetricEntity): Metric {
    const metricModel = MetricEntity.toModel(entity);
    metricModel.plugin = entity.plugin && PluginEntity.toModel(entity.plugin);
    return metricModel;
  }
}
