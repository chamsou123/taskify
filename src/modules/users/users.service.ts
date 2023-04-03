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

  /**
   * Creates a new user..
   * @param createUserInput {CreateUserDto} - The input data for creating a new user.
   * @returns A Promise that resolves to the newly created user.
   * @throws An error if the input data is invalid.
   */
  async create(createUserInput: CreateUserDto): Promise<User> {
    await this.validateUser(createUserInput);
    const user = await this.userRepository.create(createUserInput);
    return await this.userRepository.save(user);
  }

  /**
   * Retrieves a user from the database by ID.
   * @param id {number} - The ID of the user to retrieve.
   * @returns A Promise that resolves to the retrieved user.
   * @throws A NotFoundException if the user is not found.
   */
  async user(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  /**
   * Retrieves a user by email.
   * @param email {string} - The email address of the user to retrieve.
   * @returns A Promise that resolves to the retrieved user.
   * @throws A NotFoundException if the user is not found.
   */
  async userByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  /**
   * Retrieves a list of users based on filters.
   * @param filterUserInput {FilterUsersDto} - Optional filtering parameters for the user query.
   * @returns A Promise that resolves to an array of users.
   */
  async users(filterUserInput?: FilterUsersDto): Promise<User[]> {
    return await this.userRepository.findBy(filterUserInput);
  }

  /**
   * Updates a user in the database.
   * @param updateUserInput {UpdateUserDto} - The updated data for the user.
   * @returns A Promise that resolves to the updated user.
   * @throws A NotFoundException if the user is not found.
   */
  async update(updateUserInput: UpdateUserDto): Promise<User> {
    const { id, ...data } = updateUserInput;

    const user = await this.user(id);

    const updatedUser = Object.assign(user, data);

    return await this.userRepository.save(updatedUser);
  }

  /**
   * Blocks a user from the system.
   * @param id {string} - The ID of the user to block.
   * @returns A Promise that resolves to the blocked user.
   * @throws A NotFoundException if the user is not found.
   */
  async blockUser(id: number): Promise<User> {
    const user = await this.user(id);
    user.isActive = false;
    return await this.userRepository.save(user);
  }

  /**
   * Validates the input data for creating a new user.
   * @param createUserInput {CreateUserDto} - The input data for creating a new user.
   * @returns A Promise that resolves if the input data is valid.
   * @throws An error if the input data is invalid.
   */
  async validateUser(createUserInput: CreateUserDto): Promise<void> {
    const validator = new UserInputValidator([
      new EmailValidator(this.userRepository),
    ]);
    return validator.validate(createUserInput);
  }
}
