import { Test, TestingModule } from '@nestjs/testing';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

import { ListsService } from './lists.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ListsService', () => {
  let service: ListsService;

  const prismaMock = {
    list: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<ListsService>(ListsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a list for the authenticated user', async () => {
      const createdList = {
        id: 1,
        title: 'To Do',
        position: 0,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.list.create.mockResolvedValue(createdList);

      const result = await service.create(1, {
        title: 'To Do',
      });

      expect(prismaMock.list.create).toHaveBeenCalledWith({
        data: {
          title: 'To Do',
          ownerId: 1,
        },
      });

      expect(result).toEqual(createdList);
      expect(result.ownerId).toBe(1);
    });
  });

  describe('findAll', () => {
    it('should return only lists owned by the authenticated user', async () => {
      const lists = [
        {
          id: 1,
          title: 'To Do',
          position: 0,
          ownerId: 1,
        },
        {
          id: 2,
          title: 'In Progress',
          position: 1,
          ownerId: 1,
        },
      ];

      prismaMock.list.findMany.mockResolvedValue(lists);

      const result = await service.findAll(1);

      expect(prismaMock.list.findMany).toHaveBeenCalledWith({
        where: {
          ownerId: 1,
        },
        orderBy: {
          position: 'asc',
        },
      });

      expect(result).toEqual(lists);

      expect(
        result.every((list) => list.ownerId === 1),
      ).toBe(true);
    });
  });

  describe('update', () => {
    it('should allow the owner to update their list', async () => {
      prismaMock.list.findUnique.mockResolvedValue({
        id: 1,
        title: 'To Do',
        position: 0,
        ownerId: 1,
      });

      const updatedList = {
        id: 1,
        title: 'In Progress',
        position: 1,
        ownerId: 1,
      };

      prismaMock.list.update.mockResolvedValue(updatedList);

      const result = await service.update(
        1,
        1,
        {
          title: 'In Progress',
          position: 1,
        },
      );

      expect(prismaMock.list.update).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
        data: {
          title: 'In Progress',
          position: 1,
        },
      });

      expect(result).toEqual(updatedList);
    });

    it('should throw 403 when another user tries to update the list', async () => {
      prismaMock.list.findUnique.mockResolvedValue({
        id: 1,
        title: 'To Do',
        position: 0,
        ownerId: 2,
      });

      await expect(
        service.update(
          1,
          1,
          {
            title: 'Modified',
          },
        ),
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(prismaMock.list.update).not.toHaveBeenCalled();
    });

    it('should throw 404 when the list does not exist', async () => {
      prismaMock.list.findUnique.mockResolvedValue(null);

      await expect(
        service.update(
          999,
          1,
          {
            title: 'Modified',
          },
        ),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(prismaMock.list.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should allow the owner to delete their list', async () => {
      prismaMock.list.findUnique.mockResolvedValue({
        id: 1,
        title: 'To Do',
        position: 0,
        ownerId: 1,
      });

      prismaMock.list.delete.mockResolvedValue({
        id: 1,
      });

      await service.remove(1, 1);

      expect(prismaMock.list.delete).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
    });

    it('should throw 403 when another user tries to delete the list', async () => {
      prismaMock.list.findUnique.mockResolvedValue({
        id: 1,
        title: 'To Do',
        position: 0,
        ownerId: 2,
      });

      await expect(
        service.remove(1, 1),
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(prismaMock.list.delete).not.toHaveBeenCalled();
    });

    it('should throw 404 when deleting a list that does not exist', async () => {
      prismaMock.list.findUnique.mockResolvedValue(null);

      await expect(
        service.remove(999, 1),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(prismaMock.list.delete).not.toHaveBeenCalled();
    });
  });
});