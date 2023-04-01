import { Test, TestingModule } from '@nestjs/testing';

import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';

describe('CategoryResolver', () => {
  let resolver: CategoryResolver;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryResolver,
        {
          provide: CategoryService,
          useValue: {
            create: jest.fn(),
            category: jest.fn(),
            categories: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<CategoryResolver>(CategoryResolver);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
