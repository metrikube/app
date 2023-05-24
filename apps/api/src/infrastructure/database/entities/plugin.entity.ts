import { Entity, Column, PrimaryGeneratedColumn, EntitySchema } from 'typeorm';

@Entity()
export class Plugin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
