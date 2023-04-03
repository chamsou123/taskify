import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

@InputType()
export class FilterUserDto extends PartialType(
  PickType(CreateUserDto, ['email']),
) {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  id?: number;
}

@InputType()
export class FilterUsersDto extends PartialType(
  PickType(CreateUserDto, ['isActive']),
) {}
