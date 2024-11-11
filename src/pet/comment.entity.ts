import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pet } from './pet.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToMany(() => Pet, (pet) => pet.comments)
  pet: Pet;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
