import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateTodoDto } from './create-todo.dto';
import { TodoStatusEnum } from '../enums';
import { IsEnum, IsNumber } from 'class-validator';

@InputType()
export class UpdateTodoDto extends PartialType(
  OmitType(CreateTodoDto, ['user']),
) {
  @Field(() => Number)
  @IsNumber()
  id: number;

  @Field(() => TodoStatusEnum, { nullable: true })
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
}
