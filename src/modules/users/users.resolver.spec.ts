import { Test } from '@nestjs/testing';

import { User } from './entities';
import { UpdateUserDto } from './dto';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            user: jest.fn(),
            users: jest.fn(),
            update: jest.fn(),
            blockUser: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = moduleRef.get<UsersResolver>(UsersResolver);
    service = moduleRef.get<UsersService>(UsersService);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('user', () => {
    it('should return a user', async () => {
      const expectedUser: User = {
        id: 1,
        firstName: 'Jhon',
        lastName: 'Doe',
        password: 'test',
        email: 'john.doe@example.com',
        isActive: true,
        deletedAt: null,
      };
      jest.spyOn(service, 'user').mockResolvedValue(expectedUser);

      const result = await resolver.user(1);

      expect(result).toBe(expectedUser);
    });
  });

  describe('users', () => {
    it('should return an array of users', async () => {
      const expectedUsers: User[] = [
        {
          id: 1,
          firstName: 'Jhon',
          lastName: 'Doe',
          password: 'test',
          email: 'john.doe@example.com',
          isActive: true,
          deletedAt: null,
        },
        {
          id: 2,
          firstName: 'Jhon',
          lastName: 'Doe',
          password: 'test',
          email: 'john.doe2@example.com',
          isActive: true,
          deletedAt: null,
        },
      ];
      jest.spyOn(service, 'users').mockResolvedValue(expectedUsers);

      const result = await resolver.users({ isActive: true });

      expect(result).toBe(expectedUsers);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const input: UpdateUserDto = {
        id: 1,
        firstName: 'Jhon',
        lastName: 'Doe',
      };
      const expectedUser: User = {
        id: input.id,
        firstName: input.firstName,
        lastName: input.lastName,
        email: 'john.doe@example.com',
        password: 'test',
        isActive: false,
        deletedAt: null,
      };
      jest.spyOn(service, 'update').mockResolvedValue(expectedUser);

      const result = await resolver.update(input);

      expect(result).toBe(expectedUser);
      expect(service.update).toHaveBeenCalledWith(input);
    });
  });

  describe('blockUser', () => {
    it('should block a user', async () => {
      const id = 1;
      const expectedUser: User = {
        id,
        firstName: 'Jhon',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'test',
        isActive: false,
        deletedAt: null,
      };
      jest.spyOn(service, 'blockUser').mockResolvedValue(expectedUser);

      const result = await resolver.block(id);

      expect(result).toBe(expectedUser);
      expect(service.blockUser).toHaveBeenCalledWith(id);
    });
  });
});
