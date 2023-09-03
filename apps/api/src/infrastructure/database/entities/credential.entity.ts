import { Column, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';

import { CredentialType } from '@metrikube/common';

import { PluginEntity } from './plugin.entity';
import { PluginToMetricEntity } from './plugin_to_metric.entity';

@Entity('credential')
export class CredentialEntity {
  @Generated('uuid')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  type: CredentialType;

  @Column({ type: 'varchar', nullable: false })
  value: string;

  @ManyToOne(() => PluginEntity, (plugin: PluginEntity) => plugin.id, {
    createForeignKeyConstraints: true,
    nullable: false
  })
  plugin: PluginEntity;

  @RelationId((credential: CredentialEntity) => credential.plugin)
  @Column({ type: 'uuid', nullable: false })
  pluginId: PluginEntity['id'];

  @OneToMany(() => PluginToMetricEntity, (pluginToMetric: PluginToMetricEntity) => pluginToMetric.credential)
  pluginToMetrics: PluginToMetricEntity[];
}
