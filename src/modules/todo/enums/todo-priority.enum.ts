import { registerEnumType } from '@nestjs/graphql';

export enum TodoPriorityEnum {
  LOW = 0,
  Medium = 1,
  HIGH = 2,
}

registerEnumType(TodoPriorityEnum, {
  name: 'TodoPriority',
});
