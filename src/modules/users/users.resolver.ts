import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './entities';
import { FilterUsersDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, {
    name: 'user',
    description: 'Return User',
  })
  async user(@Args('id') id: number): Promise<User> {
    return this.usersService.user(id);
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
