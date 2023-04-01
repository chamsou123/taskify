import {
  Field,
  InputType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

import { CreateUserDto } from './create-user.dto';

@InputType()
export class FilterUserDto extends PartialType(
  PickType(CreateUserDto, ['email']),
) {
  @Field(() => Number, { nullable: true })
  id?: number;
}

@InputType()
export class FilterUsersDto extends PartialType(
  PickType(CreateUserDto, ['isActive']),
) {}
