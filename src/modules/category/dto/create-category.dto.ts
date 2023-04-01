import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryDto {
  @Field(() => String)
  name: string;
}
