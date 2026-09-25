import { Test, TestingModule } from '@nestjs/testing';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

import { CardsService } from './cards.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CardsService', () => {
  let service: CardsService;

  const prismaMock = {
    list: {
      findUnique: jest.fn(),
    },
    card: {
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
        CardsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<CardsService>(CardsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a card in a list owned by the user', async () => {
      prismaMock.list.findUnique.mockResolvedValue({
        id: 1,
        title: 'To Do',
        ownerId: 1,
      });

      const createdCard = {
        id: 1,
        title: 'Create API',
        description: 'Create the Kanban API',
        position: 0,
        listId: 1,
      };

      prismaMock.card.create.mockResolvedValue(createdCard);

      const result = await service.create(1, 1, {
        title: 'Create API',
        description: 'Create the Kanban API',
      });

      expect(prismaMock.list.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });

      expect(prismaMock.card.create).toHaveBeenCalledWith({
        data: {
          title: 'Create API',
          description: 'Create the Kanban API',
          listId: 1,
        },
      });

      expect(result).toEqual(createdCard);
    });

    it('should throw 404 when the list does not exist', async () => {
      prismaMock.list.findUnique.mockResolvedValue(null);

      await expect(
        service.create(999, 1, {
          title: 'Create API',
        }),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(prismaMock.card.create).not.toHaveBeenCalled();
    });

    it('should throw 403 when creating a card in another user list', async () => {
      prismaMock.list.findUnique.mockResolvedValue({
        id: 1,
        title: 'To Do',
        ownerId: 2,
      });

      await expect(
        service.create(1, 1, {
          title: 'Create API',
        }),
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(prismaMock.card.create).not.toHaveBeenCalled();
    });
  });

  describe('findAllByList', () => {
    it('should return cards from a list owned by the user', async () => {
      prismaMock.list.findUnique.mockResolvedValue({
        id: 1,
        title: 'To Do',
        ownerId: 1,
      });

      const cards = [
        {
          id: 1,
          title: 'First task',
          position: 0,
          listId: 1,
        },
        {
          id: 2,
          title: 'Second task',
          position: 1,
          listId: 1,
        },
      ];

      prismaMock.card.findMany.mockResolvedValue(cards);

      const result = await service.findAllByList(1, 1);

      expect(prismaMock.card.findMany).toHaveBeenCalledWith({
        where: {
          listId: 1,
        },
        orderBy: {
          position: 'asc',
        },
      });

      expect(result).toEqual(cards);
    });

    it('should throw 404 when the list does not exist', async () => {
      prismaMock.list.findUnique.mockResolvedValue(null);

      await expect(
        service.findAllByList(999, 1),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(prismaMock.card.findMany).not.toHaveBeenCalled();
    });

    it('should throw 403 when accessing another user list', async () => {
      prismaMock.list.findUnique.mockResolvedValue({
        id: 1,
        title: 'To Do',
        ownerId: 2,
      });

      await expect(
        service.findAllByList(1, 1),
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(prismaMock.card.findMany).not.toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a card when the parent list belongs to the user', async () => {
      const card = {
        id: 1,
        title: 'Create API',
        description: 'Backend work',
        position: 0,
        listId: 1,
        list: {
          id: 1,
          ownerId: 1,
        },
      };

      prismaMock.card.findUnique.mockResolvedValue(card);

      const result = await service.findOne(1, 1);

      expect(prismaMock.card.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
        include: {
          list: true,
        },
      });

      expect(result).toEqual(card);
    });

    it('should throw 404 when the card does not exist', async () => {
      prismaMock.card.findUnique.mockResolvedValue(null);

      await expect(
        service.findOne(999, 1),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('should throw 403 when the card belongs to another user list', async () => {
      prismaMock.card.findUnique.mockResolvedValue({
        id: 1,
        title: 'Private card',
        listId: 1,
        list: {
          id: 1,
          ownerId: 2,
        },
      });

      await expect(
        service.findOne(1, 1),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe('update', () => {
    it('should allow the owner to update a card', async () => {
      prismaMock.card.findUnique.mockResolvedValue({
        id: 1,
        title: 'Old title',
        description: null,
        position: 0,
        listId: 1,
        list: {
          id: 1,
          ownerId: 1,
        },
      });

      const updatedCard = {
        id: 1,
        title: 'New title',
        description: 'New description',
        position: 1,
        listId: 1,
      };

      prismaMock.card.update.mockResolvedValue(updatedCard);

      const result = await service.update(1, 1, {
        title: 'New title',
        description: 'New description',
        position: 1,
      });

      expect(prismaMock.card.update).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
        data: {
          title: 'New title',
          description: 'New description',
          position: 1,
          listId: undefined,
        },
      });

      expect(result).toEqual(updatedCard);
    });

    it('should throw 404 when updating a card that does not exist', async () => {
      prismaMock.card.findUnique.mockResolvedValue(null);

      await expect(
        service.update(999, 1, {
          title: 'New title',
        }),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(prismaMock.card.update).not.toHaveBeenCalled();
    });

    it('should throw 403 when updating another user card', async () => {
      prismaMock.card.findUnique.mockResolvedValue({
        id: 1,
        title: 'Private card',
        listId: 1,
        list: {
          id: 1,
          ownerId: 2,
        },
      });

      await expect(
        service.update(1, 1, {
          title: 'Modified',
        }),
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(prismaMock.card.update).not.toHaveBeenCalled();
    });

    it('should move a card to another list owned by the same user', async () => {
      prismaMock.card.findUnique.mockResolvedValue({
        id: 1,
        title: 'Task',
        listId: 1,
        list: {
          id: 1,
          ownerId: 1,
        },
      });

      prismaMock.list.findUnique.mockResolvedValue({
        id: 2,
        title: 'Done',
        ownerId: 1,
      });

      prismaMock.card.update.mockResolvedValue({
        id: 1,
        title: 'Task',
        listId: 2,
        position: 0,
      });

      const result = await service.update(1, 1, {
        listId: 2,
      });

      expect(prismaMock.list.findUnique).toHaveBeenCalledWith({
        where: {
          id: 2,
        },
      });

      expect(prismaMock.card.update).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
        data: {
          title: undefined,
          description: undefined,
          position: undefined,
          listId: 2,
        },
      });

      expect(result.listId).toBe(2);
    });

    it('should throw 404 when the destination list does not exist', async () => {
      prismaMock.card.findUnique.mockResolvedValue({
        id: 1,
        title: 'Task',
        listId: 1,
        list: {
          id: 1,
          ownerId: 1,
        },
      });

      prismaMock.list.findUnique.mockResolvedValue(null);

      await expect(
        service.update(1, 1, {
          listId: 999,
        }),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(prismaMock.card.update).not.toHaveBeenCalled();
    });

    it('should throw 403 when moving a card to another user list', async () => {
      prismaMock.card.findUnique.mockResolvedValue({
        id: 1,
        title: 'Task',
        listId: 1,
        list: {
          id: 1,
          ownerId: 1,
        },
      });

      prismaMock.list.findUnique.mockResolvedValue({
        id: 2,
        title: 'Private list',
        ownerId: 2,
      });

      await expect(
        service.update(1, 1, {
          listId: 2,
        }),
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(prismaMock.card.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should allow the owner to delete a card', async () => {
      prismaMock.card.findUnique.mockResolvedValue({
        id: 1,
        title: 'Task',
        listId: 1,
        list: {
          id: 1,
          ownerId: 1,
        },
      });

      prismaMock.card.delete.mockResolvedValue({
        id: 1,
      });

      await service.remove(1, 1);

      expect(prismaMock.card.delete).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
    });

    it('should throw 404 when deleting a card that does not exist', async () => {
      prismaMock.card.findUnique.mockResolvedValue(null);

      await expect(
        service.remove(999, 1),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(prismaMock.card.delete).not.toHaveBeenCalled();
    });

    it('should throw 403 when deleting another user card', async () => {
      prismaMock.card.findUnique.mockResolvedValue({
        id: 1,
        title: 'Private card',
        listId: 1,
        list: {
          id: 1,
          ownerId: 2,
        },
      });

      await expect(
        service.remove(1, 1),
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(prismaMock.card.delete).not.toHaveBeenCalled();
    });
  });
});