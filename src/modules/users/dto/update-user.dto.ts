import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateUserDto } from './create-user.dto';

@InputType()
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email', 'isActive', 'password']),
) {
  @Field(() => Number, { nullable: true })
  id?: number;
}
