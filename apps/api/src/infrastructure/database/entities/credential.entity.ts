import { Column, CreateDateColumn, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';

import { CredentialType } from '@metrikube/common';

import { Credential } from '../../../domain/models/credential.model';
import { PluginEntity } from './plugin.entity';
import { WidgetEntity } from './widget.entity';

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

  @OneToMany(() => WidgetEntity, (widget: WidgetEntity) => widget.credential)
  widgets: WidgetEntity[];

  @CreateDateColumn()
  createdAt: Date;

  static toModel(entity: CredentialEntity): Credential {
    return new Credential(entity.id, entity.type, entity.value, entity.pluginId);
  }

  static toModelDetailed(entity: CredentialEntity): Credential {
    const credentialModel = CredentialEntity.toModel(entity);
    credentialModel.plugin = entity.plugin && PluginEntity.toModel(entity.plugin);
    return credentialModel;
  }
}
