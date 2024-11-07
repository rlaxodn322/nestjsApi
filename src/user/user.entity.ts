import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType() // GraphQL용 ObjectType으로 선언
@Entity() // TypeORM용 Entity로 선언
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int) // GraphQL 스키마에 id 필드 추가
  id: number;

  @Column()
  @Field() // GraphQL 스키마에 username 필드 추가
  username: string;

  @Column()
  @Field() // GraphQL 스키마에 password 필드 추가
  password: string;

  @Column({ default: true })
  @Field() // GraphQL 스키마에 isActive 필드 추가
  isActive: boolean;
}
