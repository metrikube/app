import { AfterLoad, BeforeInsert, BeforeRecover, Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('credential')
export class CredentialEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  value: string;
}
