import { Test, TestingModule } from '@nestjs/testing';

jest.mock('@nestjs/jwt', () => ({
  JwtService: class JwtService {},
}));

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const authServiceMock = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a user', async () => {
      const dto = {
        name: 'Fallou Gaye',
        email: 'fallou@example.com',
        password: 'Password123!',
      };

      const user = {
        id: 1,
        name: 'Fallou Gaye',
        email: 'fallou@example.com',
        role: 'USER',
        createdAt: new Date(),
      };

      authServiceMock.register.mockResolvedValue(user);

      const result = await controller.register(dto);

      expect(authServiceMock.register).toHaveBeenCalledWith(dto);

      expect(result).toEqual(user);

      expect(result).not.toHaveProperty('password');
    });
  });

  describe('login', () => {
    it('should login a user and return an access token', async () => {
      const dto = {
        email: 'fallou@example.com',
        password: 'Password123!',
      };

      authServiceMock.login.mockResolvedValue({
        accessToken: 'test-jwt-token',
      });

      const result = await controller.login(dto);

      expect(authServiceMock.login).toHaveBeenCalledWith(dto);

      expect(result).toEqual({
        accessToken: 'test-jwt-token',
      });
    });
  });
});