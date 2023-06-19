import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('plugin')
export class Plugin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
