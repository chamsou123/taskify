import { Field, InputType } from '@nestjs/graphql';

import { TodoPriorityEnum } from '../enums';
import { Category } from '../../category/entities';
import { User } from '../../users/entities';

@InputType()
export class CreateTodoDto {
  @Field(() => String)
  name: string;

  @Field(() => String)
  content: string;

  @Field(() => Number)
  user: User;

  @Field(() => Number)
  category: Category;

  @Field(() => TodoPriorityEnum)
  priority: TodoPriorityEnum;

  @Field(() => Date)
  dueDate: Date;
}
