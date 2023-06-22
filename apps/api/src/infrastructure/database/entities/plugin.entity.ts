import { Column, CreateDateColumn, Entity, Generated, JoinColumn, OneToOne, PrimaryColumn, RelationId } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { CredentialEntity } from './credential.entity';

@Entity('plugin')
export class PluginEntity {
  @Generated('uuid')
  @PrimaryColumn({ type: 'uuid' })
  @ApiProperty({ name: 'id', type: String, description: 'Plugin id', example: 'fab8f183-7021-4a42-b429-447ee7415b93' })
  id: string;

  @ApiProperty({
    name: 'name',
    type: String,
    description: 'Plugin name',
    example: 'AWS'
  })
  @Column()
  name: string;

  @Column()
  @ApiProperty({
    name: 'type',
    type: String,
    description: 'Plugin type',
    example: 'aws'
  })
  type: string;

  @Column()
  @ApiProperty({
    name: 'description',
    type: String,
    description: 'Plugin description',
    example: 'Plugin AWS'
  })
  description: string;

  @Column()
  @ApiProperty({
    name: 'category',
    type: String,
    description: 'Plugin category',
    example: 'cloud'
  })
  category: string;

  @CreateDateColumn()
  @ApiProperty({
    name: 'createdAt',
    type: Date,
    description: 'Plugin creation date',
    example: '2023-01-01T00:00:00.000Z'
  })
  createdAt: Date;

  @JoinColumn()
  @OneToOne(() => CredentialEntity, (credential: CredentialEntity) => credential.id, {
    createForeignKeyConstraints: true
  })
  credential: CredentialEntity;

  @RelationId((plugin: PluginEntity) => plugin.credential)
  credentialId: CredentialEntity['id'];

  // @BeforeInsert()
  // credentialToBase64() {
  //   this.credential.value = Buffer.from(JSON.stringify(this.credential.value)).toString('base64');
  // }
  //
  // @AfterLoad()
  // base64ToCredential() {
  //   this.credential.value = JSON.parse(Buffer.from(this.credential.value, 'base64').toString('utf8'));
  // }
}
