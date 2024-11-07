import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateUserDto {
  @Field()
  readonly username?: string;
  @Field()
  readonly password?: string;
}
