import { AfterInsert, BeforeInsert, Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

import { Logger } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Entity('credential')
export class CredentialEntity {
  @Generated('uuid')
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ name: 'id', type: String, description: 'Credential id', example: 'fab8f183-7021-4a42-b429-447ee7415b93' })
  id: string;

  @Column()
  @ApiProperty({
    name: 'name',
    type: String,
    description: 'Credential value type',
    example: 'apiKey'
  })
  type: string;

  @Column()
  @ApiProperty({
    name: 'value',
    type: String,
    description: 'base64 encoded credential value { key: value }'
  })
  value: string;

  @BeforeInsert()
  beforeInsert() {
    Logger.debug(`BeforeInsert : ${this.value.toString()}`, 'CredentialEntity');
    this.value = Buffer.from(JSON.stringify(this.value)).toString('base64');
  }

  @AfterInsert()
  afterInsert() {
    Logger.debug(`AfterInsert : ${this.value}`, 'CredentialEntity');
  }
}
