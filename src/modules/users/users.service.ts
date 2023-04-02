import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities';
import { CreateUserDto, FilterUsersDto, UpdateUserDto } from './dto';
import { UserInputValidator } from './validators/user-input.validator';
import { EmailValidator } from './validators/email.validator';
import { USER_NOT_FOUND } from '../../errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserDto): Promise<User> {
    await this.validateUser(createUserInput);
    const user = await this.userRepository.create(createUserInput);
    return await this.userRepository.save(user);
  }

  async user(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  async userByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  async users(filterUserInput?: FilterUsersDto): Promise<User[]> {
    return await this.userRepository.findBy(filterUserInput);
  }

  async update(updateUserInput: UpdateUserDto): Promise<User> {
    const { id, ...data } = updateUserInput;

    const user = await this.user(id);

    const updatedUser = Object.assign(user, data);

    return await this.userRepository.save(updatedUser);
  }

  async blockUser(id: number): Promise<User> {
    const user = await this.user(id);
    user.isActive = false;
    return await this.userRepository.save(user);
  }

  async validateUser(createUserInput: CreateUserDto): Promise<void> {
    const validator = new UserInputValidator([
      new EmailValidator(this.userRepository),
    ]);
    return validator.validate(createUserInput);
  }
}
