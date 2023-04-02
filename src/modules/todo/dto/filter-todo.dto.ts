import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateTodoDto } from './create-todo.dto';
import { TodoStatusEnum } from '../enums';
import { FilterUserDto } from '../../users/dto';
import { FilterCategoryDto } from '../../category/dto';

@InputType()
export class FilterTodoDto extends PartialType(
  OmitType(CreateTodoDto, ['user', 'category', 'name', 'content']),
) {
  @Field(() => TodoStatusEnum, { nullable: true })
  status?: TodoStatusEnum;

  @Field(() => FilterUserDto, { nullable: true })
  user?: FilterUserDto;

  @Field(() => FilterCategoryDto, { nullable: true })
  category?: FilterCategoryDto;
}
