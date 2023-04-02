import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Todo } from './entities';
import { TodoService } from './todo.service';
import { CreateTodoDto, FilterTodoDto, UpdateTodoDto } from './dto';
import { TodoPriorityEnum, TodoStatusEnum } from './enums';
import { User } from '../users/entities';
import { Category } from '../category/entities';
import { NotFoundException } from '@nestjs/common';

describe('TodoService', () => {
  let service: TodoService;
  let todoRepository: Repository<Todo>;

  const mockTodoRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    findBy: jest.fn(),
    softDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockTodoRepository,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    todoRepository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo', async () => {
      const createTodoDto: CreateTodoDto = {
        name: 'Test Todo',
        content: 'Test Content',
        user: 1,
        category: 1,
        priority: TodoPriorityEnum.HIGH,
        dueDate: new Date('2023-04-03'),
      };

      const todo: Todo = {
        id: 1,
        name: createTodoDto.name,
        content: createTodoDto.content,
        user: { id: createTodoDto.user } as User,
        category: { id: createTodoDto.category } as Category,
        priority: createTodoDto.priority,
        status: TodoStatusEnum.NOTSTARTED,
        dueDate: createTodoDto.dueDate,
        deletedAt: null,
      };

      jest.spyOn(todoRepository, 'save').mockResolvedValue(todo);

      expect(await service.create(createTodoDto)).toEqual(todo);
    });
  });

  describe('todos', () => {
    it('should return an array of todos', async () => {
      const todos = [
        {
          id: 1,
          name: 'Todo 1',
          content: 'Content 1',
          priority: TodoPriorityEnum.LOW,
          status: TodoStatusEnum.COMPLETED,
          dueDate: new Date(),
          user: new User(),
          category: new Category(),
          deletedAt: null,
        },
        {
          id: 2,
          name: 'Todo 2',
          content: 'Content 2',
          priority: TodoPriorityEnum.Medium,
          status: TodoStatusEnum.INPROGRESS,
          dueDate: new Date(),
          user: new User(),
          category: new Category(),
          deletedAt: null,
        },
      ];

      const filter: FilterTodoDto = {
        status: TodoStatusEnum.INPROGRESS,
        user: { firstName: 'John', lastName: 'Doe' },
        category: { name: 'Category 1' },
      };

      jest.spyOn(todoRepository, 'find').mockResolvedValue(todos);

      const result = await service.todos(filter);

      expect(todoRepository.find).toHaveBeenCalledWith({
        where: filter,
        relations: {
          category: true,
          user: true,
        },
      });

      expect(result).toEqual(todos);
    });
  });

  describe('todo', () => {
    it('should return a todo', async () => {
      const todo: Todo = {
        id: 1,
        name: 'Test Todo',
        content: 'Test Content',
        user: { id: 1 } as User,
        category: { id: 1 } as Category,
        priority: TodoPriorityEnum.HIGH,
        status: TodoStatusEnum.NOTSTARTED,
        dueDate: new Date('2023-04-03'),
        deletedAt: null,
      };

      jest.spyOn(todoRepository, 'findOne').mockResolvedValue(todo);

      expect(await service.todo(1)).toEqual(todo);
    });

    it('should throw NotFoundException if todo is not found', async () => {
      jest.spyOn(todoRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.todo(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const updateTodoInput: UpdateTodoDto = {
      id: 1,
      status: TodoStatusEnum.COMPLETED,
    };

    const existingTodo = new Todo();
    const updatedTodo = new Todo();

    beforeEach(() => {
      mockTodoRepository.findOne.mockReturnValue(existingTodo);
      mockTodoRepository.save.mockReturnValue(updatedTodo);
    });

    it('should update and return the updated Todo', async () => {
      const result = await service.update(updateTodoInput);
      expect(mockTodoRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
        relations: {
          category: true,
          user: true,
        },
      });
      expect(mockTodoRepository.save).toHaveBeenCalledWith(
        Object.assign(existingTodo, {
          id: 1,
          status: TodoStatusEnum.COMPLETED,
        }),
      );
      expect(result).toEqual(updatedTodo);
    });
  });

  describe('delete', () => {
    const id = 1;

    const existingTodo = new Todo();

    beforeEach(() => {
      mockTodoRepository.findOne.mockReturnValue(existingTodo);
      mockTodoRepository.softDelete.mockReturnValue(true);
    });

    it('should soft delete a todo', async () => {
      const result = await service.delete(id);
      expect(mockTodoRepository.softDelete).toHaveBeenCalledWith(id);
      expect(result).toEqual(true);
    });
  });
});
