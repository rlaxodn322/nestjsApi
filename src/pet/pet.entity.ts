import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from './comment.entity'; // 댓글 엔티티를 가져옵니다.

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // 유기견 이름

  @Column()
  breed: string; // 유기견 품종

  @Column()
  age: number; // 유기견 나이

  @OneToMany(() => Comment, (comment) => comment.pet)
  comments: Comment[]; // 유기견에 속한 댓글들
}
