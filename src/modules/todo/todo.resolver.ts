import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Todo } from './entities';
import { CreateTodoDto, FilterTodoDto, UpdateTodoDto } from './dto';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from '../auth/guards';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Todo], { name: 'todos' })
  async todos(
    @Args('filterTodoInput', { nullable: true }) filterTodoInput: FilterTodoDto,
  ): Promise<Todo[]> {
    return await this.todoService.todos(filterTodoInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Todo, { name: 'todo' })
  async todo(@Args('id') id: number): Promise<Todo> {
    return await this.todoService.todo(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Todo, { name: 'createTodo' })
  async create(
    @Args('createTodoInput') createTodoInput: CreateTodoDto,
  ): Promise<Todo> {
    return await this.todoService.create(createTodoInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Todo, { name: 'updateTodo' })
  async update(
    @Args('updateTodoInput') updateTodoInput: UpdateTodoDto,
  ): Promise<Todo> {
    return await this.todoService.update(updateTodoInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, { name: 'deleteTodo' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return await this.todoService.delete(id);
  }
}
