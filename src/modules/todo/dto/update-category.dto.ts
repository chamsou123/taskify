import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateTodoDto } from './create-todo.dto';
import { TodoStatusEnum } from '../enums';

@InputType()
export class UpdateCategoryDto extends PartialType(
  OmitType(CreateTodoDto, ['user']),
) {
  @Field(() => TodoStatusEnum, { nullable: true })
  status: TodoStatusEnum;
}
