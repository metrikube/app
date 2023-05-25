import { Column, Entity, EntitySchema, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Plugin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
