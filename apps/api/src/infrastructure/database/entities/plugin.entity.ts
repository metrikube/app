import { AfterLoad, BeforeInsert, Column, CreateDateColumn, Entity, Generated, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

import { Credential } from '../../../domain/models/credential.model';
import { Plugin } from '../../../domain/models/plugin.model';
import { CredentialEntity } from './credential.entity';

@Entity('plugin')
export class PluginEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => CredentialEntity, { cascade: ['insert'] })
  @JoinColumn()
  credential: CredentialEntity;

  @BeforeInsert()
  credentialToBase64() {
    this.credential.value = Buffer.from(JSON.stringify(this.credential.value)).toString('base64');
  }

  @AfterLoad()
  base64ToCredential() {
    this.credential.value = JSON.parse(Buffer.from(this.credential.value, 'base64').toString('utf8'));
  }
}
