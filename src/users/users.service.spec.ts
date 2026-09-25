import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

jest.mock('argon2', () => ({
  hash: jest.fn(),
}));

import * as argon2 from 'argon2';

import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '../../generated/prisma/enums';

describe('UsersService', () => {
  let service: UsersService;

  const prismaMock = {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMe', () => {
    it('should return the authenticated user without password', async () => {
      const user = {
        id: 1,
        email: 'fallou@example.com',
        name: 'Fallou Gaye',
        role: Role.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.user.findUnique.mockResolvedValue(user);

      const result = await service.findMe(1);

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      expect(result).toEqual(user);
      expect(result).not.toHaveProperty('password');
    });

    it('should throw 404 when user does not exist', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(service.findMe(999)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should allow a user to update their own profile', async () => {
      const existingUser = {
        id: 1,
        email: 'fallou@example.com',
        name: 'Fallou',
        password: 'old-hashed-password',
        role: Role.USER,
      };

      const updatedUser = {
        id: 1,
        email: 'fallou@example.com',
        name: 'Fallou Gaye',
        role: Role.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.user.findUnique.mockResolvedValue(existingUser);
      prismaMock.user.update.mockResolvedValue(updatedUser);

      const result = await service.update(
        1,
        1,
        Role.USER,
        {
          name: 'Fallou Gaye',
        },
      );

      expect(result).toEqual(updatedUser);
      expect(result).not.toHaveProperty('password');
    });

    it('should throw 403 when a normal user updates another user', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 2,
        email: 'other@example.com',
        name: 'Other User',
        password: 'hashed-password',
        role: Role.USER,
      });

      await expect(
        service.update(
          2,
          1,
          Role.USER,
          {
            name: 'Modified Name',
          },
        ),
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(prismaMock.user.update).not.toHaveBeenCalled();
    });

    it('should throw 403 when a normal user tries to change their own role', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'fallou@example.com',
        name: 'Fallou Gaye',
        password: 'hashed-password',
        role: Role.USER,
      });

      await expect(
        service.update(
          1,
          1,
          Role.USER,
          {
            role: Role.ADMIN,
          },
        ),
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(prismaMock.user.update).not.toHaveBeenCalled();
    });

    it('should allow an admin to update another user role', async () => {
      const existingUser = {
        id: 2,
        email: 'user@example.com',
        name: 'Normal User',
        password: 'hashed-password',
        role: Role.USER,
      };

      const updatedUser = {
        id: 2,
        email: 'user@example.com',
        name: 'Normal User',
        role: Role.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.user.findUnique.mockResolvedValue(existingUser);
      prismaMock.user.update.mockResolvedValue(updatedUser);

      const result = await service.update(
        2,
        1,
        Role.ADMIN,
        {
          role: Role.ADMIN,
        },
      );

      expect(result.role).toBe(Role.ADMIN);
      expect(result).not.toHaveProperty('password');
    });

    it('should throw 404 when target user does not exist', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(
        service.update(
          999,
          1,
          Role.ADMIN,
          {
            name: 'Unknown User',
          },
        ),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(prismaMock.user.update).not.toHaveBeenCalled();
    });

    it('should throw 409 when the new email is already used', async () => {
      prismaMock.user.findUnique
        .mockResolvedValueOnce({
          id: 1,
          email: 'fallou@example.com',
          name: 'Fallou Gaye',
          password: 'hashed-password',
          role: Role.USER,
        })
        .mockResolvedValueOnce({
          id: 2,
          email: 'existing@example.com',
          name: 'Existing User',
          password: 'hashed-password',
          role: Role.USER,
        });

      await expect(
        service.update(
          1,
          1,
          Role.USER,
          {
            email: 'existing@example.com',
          },
        ),
      ).rejects.toBeInstanceOf(ConflictException);

      expect(prismaMock.user.update).not.toHaveBeenCalled();
    });

    it('should hash a new password before updating the user', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'fallou@example.com',
        name: 'Fallou Gaye',
        password: 'old-hashed-password',
        role: Role.USER,
      });

      (argon2.hash as jest.Mock).mockResolvedValue(
        'new-hashed-password',
      );

      prismaMock.user.update.mockResolvedValue({
        id: 1,
        email: 'fallou@example.com',
        name: 'Fallou Gaye',
        role: Role.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.update(
        1,
        1,
        Role.USER,
        {
          password: 'NewPassword123!',
        },
      );

      expect(argon2.hash).toHaveBeenCalledWith(
        'NewPassword123!',
      );

      expect(prismaMock.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: 1,
          },
          data: expect.objectContaining({
            password: 'new-hashed-password',
          }),
        }),
      );

      expect(result).not.toHaveProperty('password');
    });
  });
});