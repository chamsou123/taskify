import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCategoryDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;
}
