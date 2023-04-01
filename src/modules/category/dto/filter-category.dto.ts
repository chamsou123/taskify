import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateCategoryDto } from './create-category.dto';

@InputType()
export class FilterCategoryDto extends PartialType(CreateCategoryDto) {
  @Field(() => Number, { nullable: true })
  id?: number;
}
