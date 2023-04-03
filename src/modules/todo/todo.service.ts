import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Todo } from './entities';
import { CreateTodoDto, FilterTodoDto, UpdateTodoDto } from './dto';
import { TODO_NOT_FOUND } from '../../errors';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  /**
   * Creates a new Todo record.
   * @param createTodoInput {CreateTodoDto} - The input data for creating a new Todo.
   * @returns {Promise<Todo>} - The created Todo record
   */
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

  /**
   * Retrieves a single Todo record by ID.
   * @param id {number} - The ID of the Todo record to retrieve.
   * @returns {Promise<Todo>} - The retrieved Todo record.
   * @throws {NotFoundException} - If no Todo record with the given ID is found.
   */
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
      throw new NotFoundException(TODO_NOT_FOUND);
    }

    return todo;
  }

  /**
   * Retrieves multiple Todo records based on filter criteria.
   * @param filterTodoInput {FilterTodoDto} - The filter criteria for the Todo records to retrieve.
   * @returns {Promise<Todo[]>} - The retrieved Todo records.
   */
  async todos(filterTodoInput: FilterTodoDto): Promise<Todo[]> {
    return await this.todoRepository.find({
      where: filterTodoInput,
      relations: {
        category: true,
        user: true,
      },
    });
  }

  /**
   * Retrieves Todo of a specific user.
   * @param userId {number} - The ID of the user which own the Todo.
   * @param filterTodoInput {FilterTodoDto} - The filter criteria for the Todo records to retrieve.
   * @returns {Promise<Todo[]>} - The retrieved Todo records.
   */
  async userTodos(
    userId: number,
    filterTodoInput: Omit<FilterTodoDto, 'user'>,
  ): Promise<Todo[]> {
    return this.todos({
      user: {
        id: userId,
      },
      ...filterTodoInput,
    });
  }

  /**
   * Updates a single Todo record by ID.
   * @param  updateTodoInput {UpdateTodoDto} - The input data for updating a Todo record.
   * @returns {Promise<Todo>} - The updated Todo record.
   * @throws {NotFoundException} - If no Todo record with the given ID is found.
   */
  async update(updateTodoInput: UpdateTodoDto): Promise<Todo> {
    const { id, ...data } = updateTodoInput;

    const todo = await this.todo(id);

    const updatedTodo = Object.assign(todo, data);

    return await this.todoRepository.save(updatedTodo);
  }

  /**
   * Deletes a single Todo record by ID.
   * @param id {number} - The ID of the Todo record to delete.
   * @returns {Promise<boolean>} - A boolean indicating whether the Todo record was deleted.
   * @throws {NotFoundException} - If no Todo record with the given ID is found.
   */
  async delete(id: number): Promise<boolean> {
    await this.todo(id);
    await this.todoRepository.softDelete(id);
    return true;
  }
}
