import { Field, InputType } from '@nestjs/graphql';
import { Column, Index } from 'typeorm';

@InputType()
export class CreateUserDto {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  @Index()
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => Boolean)
  isActive?: boolean;
}
