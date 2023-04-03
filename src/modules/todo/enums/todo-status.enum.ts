import { registerEnumType } from '@nestjs/graphql';

export enum TodoStatusEnum {
  INPROGRESS = 0,
  COMPLETED = 1,
}

registerEnumType(TodoStatusEnum, {
  name: 'TodoStatus',
});
