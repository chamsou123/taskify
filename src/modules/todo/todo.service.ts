import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Todo } from './entities';
import { CreateTodoDto, FilterTodoDto, UpdateTodoDto } from './dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoInput: CreateTodoDto): Promise<Todo> {
    const { user, category, ...data } = createTodoInput;

    const todo = await this.todoRepository.create({
      user: {
        id: user,
      },
      category: {
        id: category,
      },
      ...data,
    });

    return this.todoRepository.save(todo);
  }

  async todo(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        category: true,
        user: true,
      },
    });

    if (!todo) {
      throw new NotFoundException();
    }

    return todo;
  }

  async todos(filterTodoInput: FilterTodoDto): Promise<Todo[]> {
    return await this.todoRepository.find({
      where: filterTodoInput,
      relations: {
        category: true,
        user: true,
      },
    });
  }

  async update(updateTodoInput: UpdateTodoDto): Promise<Todo> {
    const { id, ...data } = updateTodoInput;

    const todo = await this.todo(id);

    const updatedTodo = Object.assign(todo, data);

    return await this.todoRepository.save(updatedTodo);
  }

  async delete(id: number): Promise<boolean> {
    await this.todo(id);
    await this.todoRepository.softDelete(id);
    return true;
  }
}
