import { ConflictException, Injectable } from '@nestjs/common';

import { Validator } from './interfaces';
import { CreateUserDto } from '../dto';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmailValidator implements Validator {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validate(input: CreateUserDto) {
    const { email } = input;

    const existingUser = await this.userRepository.findOneBy({ email });

    if (existingUser) {
      throw new ConflictException('User with email already registered');
    }
  }
}
