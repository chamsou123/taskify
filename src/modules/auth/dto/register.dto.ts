import { InputType } from '@nestjs/graphql';

import { CreateUserDto } from '../../users/dto';

@InputType()
export class RegisterDto extends CreateUserDto {}
