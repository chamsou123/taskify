import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { User } from './entities';
import { FilterUsersDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => User, {
    name: 'user',
    description: 'Return a User based on its id',
  })
  async user(@Args('id') id: number): Promise<User> {
    return this.usersService.user(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [User], {
    name: 'users',
    description: 'Return Users list based on filters',
  })
  async users(
    @Args('filterUsersInput', { nullable: true })
    filterUsersInput: FilterUsersDto,
  ): Promise<User[]> {
    return this.usersService.users(filterUsersInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User, {
    name: 'updateUser',
    description: 'Create a new User',
  })
  async update(
    @Args('updateUserInput') updateUserInput: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(updateUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User, {
    name: 'blockUser',
    description: 'Block a user based on its id',
  })
  async block(@Args('id') id: number): Promise<User> {
    return await this.usersService.blockUser(id);
  }
}
