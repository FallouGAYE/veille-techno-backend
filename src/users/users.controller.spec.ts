import { Test, TestingModule } from '@nestjs/testing';

jest.mock('@nestjs/jwt', () => ({
  JwtService: class JwtService {},
}));

jest.mock('@nestjs/config', () => ({
  ConfigService: class ConfigService {},
}));

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Role } from '../../generated/prisma/enums';

describe('UsersController', () => {
  let controller: UsersController;

  const usersServiceMock = {
    findMe: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test-secret'),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMe', () => {
    it('should return the authenticated user without password', async () => {
      const request = {
        user: {
          sub: 1,
          role: Role.USER,
        },
      } as any;

      const user = {
        id: 1,
        email: 'fallou@example.com',
        name: 'Fallou Gaye',
        role: Role.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      usersServiceMock.findMe.mockResolvedValue(user);

      const result = await controller.getMe(request);

      expect(usersServiceMock.findMe).toHaveBeenCalledWith(1);
      expect(result).toEqual(user);
      expect(result).not.toHaveProperty('password');
    });
  });

  describe('updateUser', () => {
    it('should update the authenticated user', async () => {
      const request = {
        user: {
          sub: 1,
          role: Role.USER,
        },
      } as any;

      const dto = {
        name: 'Fallou Gaye Updated',
      };

      const updatedUser = {
        id: 1,
        email: 'fallou@example.com',
        name: 'Fallou Gaye Updated',
        role: Role.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      usersServiceMock.update.mockResolvedValue(updatedUser);

      const result = await controller.updateUser(
        1,
        dto,
        request,
      );

      expect(usersServiceMock.update).toHaveBeenCalledWith(
        1,
        1,
        Role.USER,
        dto,
      );

      expect(result).toEqual(updatedUser);
      expect(result).not.toHaveProperty('password');
    });

    it('should pass the authenticated admin role to the service', async () => {
      const request = {
        user: {
          sub: 1,
          role: Role.ADMIN,
        },
      } as any;

      const dto = {
        role: Role.ADMIN,
      };

      const updatedUser = {
        id: 2,
        email: 'user@example.com',
        name: 'User',
        role: Role.ADMIN,
      };

      usersServiceMock.update.mockResolvedValue(updatedUser);

      const result = await controller.updateUser(
        2,
        dto,
        request,
      );

      expect(usersServiceMock.update).toHaveBeenCalledWith(
        2,
        1,
        Role.ADMIN,
        dto,
      );

      expect(result).toEqual(updatedUser);
    });
  });
});