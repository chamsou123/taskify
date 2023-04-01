import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Todo } from './entities';
import { CreateTodoDto, FilterTodoDto } from './dto';
import { TodoService } from './todo.service';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: 'todos' })
  async todos(
    @Args('filterTodoInput', { nullable: true }) filterTodoInput: FilterTodoDto,
  ): Promise<Todo[]> {
    return await this.todoService.todos(filterTodoInput);
  }

  @Query(() => Todo, { name: 'todo' })
  async todo(@Args('id') id: number): Promise<Todo> {
    return await this.todoService.todo(id);
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  async create(
    @Args('createTodoInput') createTodoInput: CreateTodoDto,
  ): Promise<Todo> {
    return await this.todoService.create(createTodoInput);
  }
}
