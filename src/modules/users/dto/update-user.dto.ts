import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

@InputType()
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email', 'isActive', 'password']),
) {
  @Field(() => Number)
  @IsNumber()
  id: number;
}
