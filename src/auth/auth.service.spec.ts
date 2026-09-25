import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

jest.mock('@nestjs/jwt', () => ({
  JwtService: class JwtService {},
}));

jest.mock('argon2', () => ({
  hash: jest.fn(),
  verify: jest.fn(),
}));

import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthService', () => {
  let service: AuthService;

  const prismaMock = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const jwtServiceMock = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a user and never return the password', async () => {
      const registerDto = {
        name: 'Fallou Gaye',
        email: 'fallou@example.com',
        password: 'Password123!',
      };

      const createdUser = {
        id: 1,
        name: 'Fallou Gaye',
        email: 'fallou@example.com',
        password: 'hashed-password',
        role: 'USER',
        createdAt: new Date(),
      };

      prismaMock.user.findUnique.mockResolvedValue(null);
      (argon2.hash as jest.Mock).mockResolvedValue('hashed-password');
      prismaMock.user.create.mockResolvedValue(createdUser);

      const result = await service.register(registerDto);

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: {
          email: 'fallou@example.com',
        },
      });

      expect(argon2.hash).toHaveBeenCalledWith('Password123!');

      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: {
          name: 'Fallou Gaye',
          email: 'fallou@example.com',
          password: 'hashed-password',
        },
      });

      expect(result).toEqual({
        id: 1,
        name: 'Fallou Gaye',
        email: 'fallou@example.com',
        role: 'USER',
        createdAt: createdUser.createdAt,
      });

      expect(result).not.toHaveProperty('password');
    });

    it('should throw 409 when email is already used', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'fallou@example.com',
      });

      await expect(
        service.register({
          name: 'Fallou Gaye',
          email: 'fallou@example.com',
          password: 'Password123!',
        }),
      ).rejects.toBeInstanceOf(ConflictException);

      expect(prismaMock.user.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should return an access token with valid credentials', async () => {
      const user = {
        id: 1,
        name: 'Fallou Gaye',
        email: 'fallou@example.com',
        password: 'hashed-password',
        role: 'USER',
      };

      prismaMock.user.findUnique.mockResolvedValue(user);
      (argon2.verify as jest.Mock).mockResolvedValue(true);

      jwtServiceMock.signAsync.mockResolvedValue('test-jwt-token');

      const result = await service.login({
        email: 'fallou@example.com',
        password: 'Password123!',
      });

      expect(argon2.verify).toHaveBeenCalledWith(
        'hashed-password',
        'Password123!',
      );

      expect(jwtServiceMock.signAsync).toHaveBeenCalledWith({
        sub: 1,
        role: 'USER',
      });

      expect(result).toEqual({
        accessToken: 'test-jwt-token',
      });

      expect(result).not.toHaveProperty('password');
    });

    it('should throw 401 when email does not exist', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(
        service.login({
          email: 'unknown@example.com',
          password: 'Password123!',
        }),
      ).rejects.toBeInstanceOf(UnauthorizedException);

      expect(argon2.verify).not.toHaveBeenCalled();
      expect(jwtServiceMock.signAsync).not.toHaveBeenCalled();
    });

    it('should throw 401 when password is incorrect', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'fallou@example.com',
        password: 'hashed-password',
        role: 'USER',
      });

      (argon2.verify as jest.Mock).mockResolvedValue(false);

      await expect(
        service.login({
          email: 'fallou@example.com',
          password: 'WrongPassword123!',
        }),
      ).rejects.toBeInstanceOf(UnauthorizedException);

      expect(jwtServiceMock.signAsync).not.toHaveBeenCalled();
    });

    it('should use the same error message for unknown email and wrong password', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(
        service.login({
          email: 'unknown@example.com',
          password: 'Password123!',
        }),
      ).rejects.toThrow('Invalid email or password');

      prismaMock.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'fallou@example.com',
        password: 'hashed-password',
        role: 'USER',
      });

      (argon2.verify as jest.Mock).mockResolvedValue(false);

      await expect(
        service.login({
          email: 'fallou@example.com',
          password: 'WrongPassword123!',
        }),
      ).rejects.toThrow('Invalid email or password');
    });
  });
});