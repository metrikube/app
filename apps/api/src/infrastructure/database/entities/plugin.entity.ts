import { Column, CreateDateColumn, Entity, Generated, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

import { Plugin } from '../../../domain/models/plugin.model';
import { MetricEntity } from './metric.entity';
import { WidgetEntity } from './widget.entity';

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
  @OneToMany(() => WidgetEntity, (widget: WidgetEntity) => widget.plugin)
  widgets: WidgetEntity[];

  @JoinColumn()
  @OneToMany(() => MetricEntity, (metric: MetricEntity) => metric.plugin)
  metrics: MetricEntity[];

  @Column({ type: 'varchar', nullable: false })
  credentialType: string;

  @Column({ type: 'varchar', nullable: true })
  iconUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  /**
   * Maps a PluginEntity to a Plugin domain model
   * @param entity
   */
  static toModel(entity: PluginEntity): Plugin {
    // prettier-ignore
    return new Plugin(
      entity.id,
      entity.name,
      entity.type,
      entity.description,
      entity.instruction,
      entity.category,
      entity.credentialType,
      entity.iconUrl
    );
  }

  static toModelDetailed(entity: PluginEntity): Plugin {
    const pluginModel = PluginEntity.toModel(entity);
    pluginModel.metrics = entity.metrics.map(MetricEntity.toModel);
    pluginModel.widgets = entity.widgets.map(WidgetEntity.toModel);
    return pluginModel;
  }
}
