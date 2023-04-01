import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginDto {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
