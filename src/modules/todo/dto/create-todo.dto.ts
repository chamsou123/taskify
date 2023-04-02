import { Field, InputType } from '@nestjs/graphql';

import { TodoPriorityEnum } from '../enums';

@InputType()
export class CreateTodoDto {
  @Field(() => String)
  name: string;

  @Field(() => String)
  content: string;

  @Field(() => Number)
  user: number;

  @Field(() => Number)
  category: number;

  @Field(() => TodoPriorityEnum)
  priority: TodoPriorityEnum;

  @Field(() => Date)
  dueDate: Date;
}
