import { Field, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

import { TodoPriorityEnum } from '../enums';

@InputType()
export class CreateTodoDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsString()
  content: string;

  @Field(() => Number)
  @IsNumber()
  user: number;

  @Field(() => Number)
  @IsNumber()
  category: number;

  @Field(() => TodoPriorityEnum)
  @IsEnum(TodoPriorityEnum)
  priority: TodoPriorityEnum;

  @Field(() => Date)
  @IsDate()
  dueDate: Date;
}
