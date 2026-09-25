import {
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

jest.mock('@nestjs/jwt', () => ({
  JwtService: class JwtService {},
}));

jest.mock('@nestjs/config', () => ({
  ConfigService: class ConfigService {},
}));

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  const jwtServiceMock = {
    verifyAsync: jest.fn(),
  };

  const configServiceMock = {
    getOrThrow: jest.fn(),
  };

  const createContext = (
    authorization?: string,
  ): ExecutionContext => {
    const request = {
      headers: authorization
        ? { authorization }
        : {},
    };

    return {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as ExecutionContext;
  };

  beforeEach(() => {
    jest.clearAllMocks();

    configServiceMock.getOrThrow.mockReturnValue(
      'test-secret',
    );

    guard = new JwtAuthGuard(
      jwtServiceMock as unknown as JwtService,
      configServiceMock as unknown as ConfigService,
    );
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow access with a valid Bearer token', async () => {
    const payload = {
      sub: 1,
      role: 'USER',
      exp: 9999999999,
    };

    jwtServiceMock.verifyAsync.mockResolvedValue(payload);

    const context = createContext(
      'Bearer valid-token',
    );

    const result = await guard.canActivate(context);

    expect(result).toBe(true);

    expect(jwtServiceMock.verifyAsync).toHaveBeenCalledWith(
      'valid-token',
      {
        secret: 'test-secret',
      },
    );
  });

  it('should add the JWT payload to request.user', async () => {
    const payload = {
      sub: 1,
      role: 'USER',
      exp: 9999999999,
    };

    jwtServiceMock.verifyAsync.mockResolvedValue(payload);

    const request = {
      headers: {
        authorization: 'Bearer valid-token',
      },
    } as any;

    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as ExecutionContext;

    await guard.canActivate(context);

    expect(request.user).toEqual(payload);
  });

  it('should throw 401 when Authorization header is missing', async () => {
    const context = createContext();

    await expect(
      guard.canActivate(context),
    ).rejects.toThrow(UnauthorizedException);

    await expect(
      guard.canActivate(context),
    ).rejects.toThrow(
      'Authentication required',
    );

    expect(
      jwtServiceMock.verifyAsync,
    ).not.toHaveBeenCalled();
  });

  it('should throw 401 when authorization type is not Bearer', async () => {
    const context = createContext(
      'Basic invalid-token',
    );

    await expect(
      guard.canActivate(context),
    ).rejects.toThrow(UnauthorizedException);

    expect(
      jwtServiceMock.verifyAsync,
    ).not.toHaveBeenCalled();
  });

  it('should throw 401 when Bearer token is missing', async () => {
    const context = createContext('Bearer');

    await expect(
      guard.canActivate(context),
    ).rejects.toThrow(UnauthorizedException);

    expect(
      jwtServiceMock.verifyAsync,
    ).not.toHaveBeenCalled();
  });

  it('should throw 401 when JWT is invalid', async () => {
    jwtServiceMock.verifyAsync.mockRejectedValue(
      new Error('Invalid token'),
    );

    const context = createContext(
      'Bearer invalid-token',
    );

    await expect(
      guard.canActivate(context),
    ).rejects.toThrow(UnauthorizedException);

    await expect(
      guard.canActivate(context),
    ).rejects.toThrow(
      'Invalid or expired token',
    );
  });

  it('should throw 401 when JWT is expired', async () => {
    jwtServiceMock.verifyAsync.mockRejectedValue(
      new Error('Token expired'),
    );

    const context = createContext(
      'Bearer expired-token',
    );

    await expect(
      guard.canActivate(context),
    ).rejects.toThrow(UnauthorizedException);
  });
});
