import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './entities';
import {
  CreateUserDto,
  FilterUserDto,
  FilterUsersDto,
  UpdateUserDto,
} from './dto';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, {
    name: 'user',
    description: 'Return User',
  })
  async user(
    @Args('filterUserInput', { nullable: true }) filterUserInput: FilterUserDto,
  ): Promise<User> {
    return this.usersService.user(filterUserInput);
  }

  @Query(() => [User], {
    name: 'users',
    description: 'Return Users',
  })
  async users(
    @Args('filterUsersInput', { nullable: true })
    filterUsersInput: FilterUsersDto,
  ): Promise<User[]> {
    return this.usersService.users(filterUsersInput);
  }

  @Mutation(() => User, {
    name: 'createUser',
    description: 'create a new User',
  })
  async create(
    @Args('createUserInput') createUserInput: CreateUserDto,
  ): Promise<User> {
    return await this.usersService.create(createUserInput);
  }

  @Mutation(() => User, {
    name: 'updateUser',
    description: 'create a new User',
  })
  async update(
    @Args('updateUserInput') updateUserInput: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(updateUserInput);
  }

  @Mutation(() => User, {
    name: 'blockUser',
    description: 'block a user',
  })
  async block(@Args('id') id: number): Promise<User> {
    return await this.usersService.blockUser(id);
  }
}
