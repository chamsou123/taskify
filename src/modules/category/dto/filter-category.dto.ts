import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateCategoryDto } from './create-category.dto';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class FilterCategoryDto extends PartialType(CreateCategoryDto) {
  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  id?: number;
}
