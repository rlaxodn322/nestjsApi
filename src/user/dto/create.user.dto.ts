import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
@InputType()
export class CreateUserDto {
  @Field()
  readonly username: string;
  @Field()
  readonly password: string;
}
