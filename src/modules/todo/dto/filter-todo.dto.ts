import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';

import { CreateTodoDto } from './create-todo.dto';
import { TodoStatusEnum } from '../enums';
import { FilterUserDto } from '../../users/dto';
import { FilterCategoryDto } from '../../category/dto';

@InputType()
export class FilterTodoDto extends PartialType(
  OmitType(CreateTodoDto, ['user', 'category', 'name', 'content']),
) {
  @Field(() => TodoStatusEnum, { nullable: true })
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status?: TodoStatusEnum;

  @Field(() => FilterUserDto, { nullable: true })
  @IsOptional()
  user?: FilterUserDto;

  @Field(() => FilterCategoryDto, { nullable: true })
  @IsOptional()
  category?: FilterCategoryDto;
}
