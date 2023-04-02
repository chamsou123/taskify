import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { User } from './entities';
import {
  CreateUserDto,
  FilterUserDto,
  FilterUsersDto,
  UpdateUserDto,
} from './dto';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    findBy: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = moduleRef.get<UsersService>(UsersService);
    userRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    const createUserInput: CreateUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
    };
    const user = new User();

    beforeEach(() => {
      mockUserRepository.findOneBy.mockReturnValue(createUserInput);
      mockUserRepository.create.mockReturnValue(user);
      mockUserRepository.save.mockReturnValue(user);
    });

    it('should create and return a new user', async () => {
      // @ts-ignore
      jest.spyOn(service, 'validateUser').mockReturnValue(true);
      const result = await service.create(createUserInput);
      expect(mockUserRepository.create).toHaveBeenCalledWith(createUserInput);
      expect(mockUserRepository.save).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });

    it('should throw a conflict error because user exist', async () => {
      await expect(
        async () => await service.create(createUserInput),
      ).rejects.toThrow();
    });
  });

  describe('user', () => {
    const filterUserInput: FilterUserDto = {
      id: 1,
    };
    const user = new User();

    beforeEach(() => {
      mockUserRepository.findOneBy.mockReturnValue(user);
    });

    it('should return a user if found', async () => {
      const result = await service.user(filterUserInput);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith(
        filterUserInput,
      );
      expect(result).toEqual(user);
    });

    it('should throw a NotFoundException if user is not found', async () => {
      mockUserRepository.findOneBy.mockReturnValue(null);
      await expect(service.user(filterUserInput)).rejects.toThrowError(
        '404001: USER NOT FOUND',
      );
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith(
        filterUserInput,
      );
    });
  });

  describe('users', () => {
    const filterUsersInput: FilterUsersDto = {
      isActive: true,
    };
    const users = [new User(), new User()];

    beforeEach(() => {
      mockUserRepository.findBy.mockReturnValue(users);
    });

    it('should return a list of users based on the filter', async () => {
      const result = await service.users(filterUsersInput);
      expect(mockUserRepository.findBy).toHaveBeenCalledWith(filterUsersInput);
      expect(result).toEqual(users);
    });
  });

  describe('update', () => {
    const updateUserInput: UpdateUserDto = {
      id: 1,
      firstName: 'Jane',
      lastName: 'Doe',
    };
    const existingUser = new User();
    const updatedUser = new User();

    beforeEach(() => {
      mockUserRepository.findOneBy.mockReturnValue(existingUser);
      mockUserRepository.save.mockReturnValue(updatedUser);
      Object.assign(existingUser, {
        id: 1,
        firstName: 'Jane',
        lastName: 'Doe',
      });
    });

    it('should update and return the updated user', async () => {
      const result = await service.update(updateUserInput);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockUserRepository.save).toHaveBeenCalledWith(
        Object.assign(existingUser, {
          id: 1,
          firstName: 'Jane',
          lastName: 'Doe',
        }),
      );
      expect(result).toEqual(updatedUser);
    });
  });

  describe('blockUser', () => {
    const id = 1;
    const user = new User();

    beforeEach(() => {
      mockUserRepository.findOneBy.mockReturnValue(user);
      mockUserRepository.save.mockReturnValue(user);
    });

    it('should set the isActive flag to false and return the updated user', async () => {
      const result = await service.blockUser(id);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(user.isActive).toBe(false);
      expect(mockUserRepository.save).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });
  });

  describe('validate', () => {
    const createUserInput: CreateUserDto = {
      firstName: 'Jhon Doe',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
    };

    const mockExistingUser: User = {
      id: 1,
      firstName: 'Jhon Doe',
      lastName: 'Doe',
      email: createUserInput.email,
      password: 'password123',
      isActive: true,
      deletedAt: null,
    };

    it('should throw a ConflictException if a one of the validators fail', async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UsersService,
          {
            provide: getRepositoryToken(User),
            useValue: mockUserRepository,
          },
        ],
      }).compile();

      const service = moduleRef.get<UsersService>(UsersService);
      jest.spyOn(service, 'user').mockResolvedValue(mockExistingUser);

      await expect(service.validateUser(createUserInput)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should not throw a ConflictException if no validator fail', async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UsersService,
          {
            provide: getRepositoryToken(User),
            useValue: mockUserRepository,
          },
        ],
      }).compile();

      const service = moduleRef.get<UsersService>(UsersService);
      jest.spyOn(service, 'user').mockResolvedValue(null);

      await expect(
        service.validateUser(createUserInput),
      ).resolves.toBeUndefined();
    });
  });
});
