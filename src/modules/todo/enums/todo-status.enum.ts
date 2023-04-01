import { registerEnumType } from '@nestjs/graphql';

export enum TodoStatusEnum {
  NOTSTARTED = 0,
  INPROGRESS = 1,
  COMPLETED = 2,
}

registerEnumType(TodoStatusEnum, {
  name: 'TodoStatus',
});
