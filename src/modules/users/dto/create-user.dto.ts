import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  isActive?: boolean;
}
