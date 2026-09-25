jest.mock('@prisma/adapter-pg', () => ({
  PrismaPg: jest.fn().mockImplementation(({ connectionString }) => ({
    connectionString,
  })),
}));

jest.mock('../../generated/prisma/client', () => ({
  PrismaClient: class PrismaClient {
    $connect = jest.fn().mockResolvedValue(undefined);
  },
}));

import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  const originalDatabaseUrl = process.env.DATABASE_URL;

  afterEach(() => {
    if (originalDatabaseUrl === undefined) {
      delete process.env.DATABASE_URL;
    } else {
      process.env.DATABASE_URL = originalDatabaseUrl;
    }

    jest.clearAllMocks();
  });

  it('should be defined when DATABASE_URL exists', () => {
    process.env.DATABASE_URL =
      'postgresql://test:test@localhost:5432/test';

    const service = new PrismaService();

    expect(service).toBeDefined();
  });

  it('should throw an error when DATABASE_URL is not defined', () => {
    delete process.env.DATABASE_URL;

    expect(() => new PrismaService()).toThrow(
      'DATABASE_URL is not defined',
    );
  });

  it('should connect to the database on module initialization', async () => {
    process.env.DATABASE_URL =
      'postgresql://test:test@localhost:5432/test';

    const service = new PrismaService();

    const connectSpy = jest.spyOn(service, '$connect');

    await service.onModuleInit();

    expect(connectSpy).toHaveBeenCalledTimes(1);
  });
});
