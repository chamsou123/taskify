import { ConflictException, Injectable } from '@nestjs/common';

import { Validator } from './interfaces';
import { CreateUserDto } from '../dto';
import { UsersService } from '../users.service';

@Injectable()
export class EmailValidator implements Validator {
  constructor(private readonly usersService: UsersService) {}
  async validate(input: CreateUserDto) {
    const { email } = input;

    const existingUser = await this.usersService.user({ email });

    if (existingUser) {
      throw new ConflictException('User with email already registered');
    }
  }
}
