import { Test, TestingModule } from '@nestjs/testing';

import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';
import { Todo } from './entities';
import { TodoPriorityEnum, TodoStatusEnum } from './enums';
import { User } from '../users/entities';
import { Category } from '../category/entities';
import { CreateTodoDto, UpdateTodoDto } from './dto';

describe('TodoResolver', () => {
  let resolver: TodoResolver;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoResolver,
        {
          provide: TodoService,
          useValue: {
            create: jest.fn(),
            todo: jest.fn(),
            todos: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<TodoResolver>(TodoResolver);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('todo', () => {
    it('should return a todo', async () => {
      const expectedTodo: Todo = {
        id: 1,
        name: 'Todo 1',
        content: 'Todo 1 content',
        status: TodoStatusEnum.INPROGRESS,
        priority: TodoPriorityEnum.HIGH,
        user: new User(),
        category: new Category(),
        dueDate: new Date(),
        deletedAt: null,
      };

      jest.spyOn(service, 'todo').mockResolvedValue(expectedTodo);

      const result = await resolver.todo(1);

      expect(result).toBe(expectedTodo);
    });
  });

  describe('users', () => {
    it('should return an array of users', async () => {
      const expectedTodos: Todo[] = [
        {
          id: 1,
          name: 'Todo 1',
          content: 'Todo 1 content',
          status: TodoStatusEnum.INPROGRESS,
          priority: TodoPriorityEnum.HIGH,
          user: new User(),
          category: new Category(),
          dueDate: new Date(),
          deletedAt: null,
        },
        {
          id: 2,
          name: 'Todo 2',
          content: 'Todo 2 content',
          status: TodoStatusEnum.INPROGRESS,
          priority: TodoPriorityEnum.HIGH,
          user: new User(),
          category: new Category(),
          dueDate: new Date(),
          deletedAt: null,
        },
      ];
      jest.spyOn(service, 'todos').mockResolvedValue(expectedTodos);

      const result = await resolver.todos({
        status: TodoStatusEnum.INPROGRESS,
      });

      expect(result).toBe(expectedTodos);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const input: CreateTodoDto = {
        name: 'Todo 1',
        content: 'Todo 1 content',
        priority: TodoPriorityEnum.HIGH,
        user: 1,
        category: 1,
        dueDate: new Date(),
      };

      const expectedTodo: Todo = {
        id: 1,
        name: 'Todo 1',
        content: 'Todo 1 content',
        priority: TodoPriorityEnum.HIGH,
        status: TodoStatusEnum.INPROGRESS,
        user: new User(),
        category: new Category(),
        dueDate: new Date(),
        deletedAt: null,
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedTodo);

      const result = await resolver.create(input);

      expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toBe(expectedTodo);
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      const input: UpdateTodoDto = {
        id: 1,
        status: TodoStatusEnum.COMPLETED,
      };

      const expectedTodo: Todo = {
        id: 1,
        name: 'Todo 1',
        content: 'Todo 1 content',
        priority: TodoPriorityEnum.HIGH,
        status: TodoStatusEnum.INPROGRESS,
        user: new User(),
        category: new Category(),
        dueDate: new Date(),
        deletedAt: null,
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedTodo);

      const result = await resolver.update(input);

      expect(result).toBe(expectedTodo);
      expect(service.update).toHaveBeenCalledWith(input);
    });
  });

  describe('delete', () => {
    it('should softDelete a todo', async () => {
      const id = 1;

      jest.spyOn(service, 'delete').mockResolvedValue(true);

      const result = await resolver.delete(id);

      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toBe(true);
    });
  });
});
