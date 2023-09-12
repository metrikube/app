import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, RelationId } from 'typeorm';

import { Widget } from '../../../domain/models/widget.model';
import { AlertEntity } from './alert.entity';
import { CredentialEntity } from './credential.entity';
import { MetricEntity } from './metric.entity';
import { PluginEntity } from './plugin.entity';

@Entity('widget')
export class WidgetEntity {
  @Generated('uuid')
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @ManyToOne(() => PluginEntity, (plugin: PluginEntity) => plugin.widgets)
  @JoinColumn({ foreignKeyConstraintName: 'fk_plugin_id' })
  plugin: PluginEntity;

  @RelationId((widget: WidgetEntity) => widget.plugin)
  @Column({ type: 'uuid', nullable: false })
  pluginId: string;

  @RelationId((widget: WidgetEntity) => widget.credential)
  @Column({ type: 'uuid', nullable: false })
  credentialId: string;

  @JoinColumn({ foreignKeyConstraintName: 'fk_credential_id' })
  @ManyToOne(() => CredentialEntity, (credential: CredentialEntity) => credential.widgets)
  credential: CredentialEntity;

  @ManyToOne(() => MetricEntity, (metric: MetricEntity) => metric.widgets)
  @JoinColumn({ foreignKeyConstraintName: 'fk_metric_id' })
  metric: MetricEntity;

  @Column({ type: 'uuid', nullable: false })
  metricId: string;

  @Column({ type: 'varchar', nullable: true })
  resourceId: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @JoinColumn()
  @OneToMany(() => AlertEntity, (alert: AlertEntity) => alert.widget)
  alerts: AlertEntity[];

  @CreateDateColumn()
  createdAt: Date;

  static toModel(entity: WidgetEntity): Widget {
    return new Widget(entity.id, entity.name, entity.description, entity.pluginId, entity.credentialId, entity.metricId, entity.isActive, entity.resourceId);
  }

  static toModelDetailed(entity: WidgetEntity): Widget {
    const widget = WidgetEntity.toModel(entity);
    widget.plugin = entity.plugin && PluginEntity.toModel(entity.plugin);
    widget.credential = entity.credential && CredentialEntity.toModel(entity.credential);
    widget.metric = entity.metric && MetricEntity.toModel(entity.metric);
    widget.alerts = entity.alerts && entity.alerts.map(AlertEntity.toModel);
    return widget;
  }
}
