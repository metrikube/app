import { Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { PluginEntity } from './plugin.entity';

@Entity('credential')
export class CredentialEntity {
  @Generated('uuid')
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    name: 'id',
    type: String,
    description: 'Credential id',
    example: 'fab8f183-7021-4a42-b429-447ee7415b93'
  })
  id: string;

  @Column()
  @ApiProperty({
    name: 'type',
    type: String,
    description: 'Credential value type',
    example: 'apiKey'
  })
  type: string; // CredentialType;

  @Column()
  @ApiProperty({
    name: 'value',
    type: String,
    description: 'base64 encoded credential value { key: value }'
  })
  value: string;

  @ManyToOne(() => PluginEntity, (plugin: PluginEntity) => plugin.id, {
    createForeignKeyConstraints: true,
    nullable: false
  })
  plugin: PluginEntity;

  @RelationId((credential: CredentialEntity) => credential.plugin)
  @Column({ type: 'uuid', nullable: false })
  pluginId: PluginEntity['id'];

  // @BeforeInsert()
  // beforeInsert() {
  //   Logger.debug(`BeforeInsert : ${this.value.toString()}`, 'CredentialEntity');
  //   this.value = Buffer.from(JSON.stringify(this.value)).toString('base64');
  // }

  // @AfterInsert()
  // afterInsert() {
  //   Logger.debug(`AfterInsert : ${this.value}`, 'CredentialEntity');
  // }
}
