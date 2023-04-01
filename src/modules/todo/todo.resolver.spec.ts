import { Test, TestingModule } from '@nestjs/testing';

import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';

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
});
