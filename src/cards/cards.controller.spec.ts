import { Test, TestingModule } from '@nestjs/testing';

jest.mock('../auth/guards/jwt-auth.guard', () => ({
  JwtAuthGuard: class JwtAuthGuard {
    canActivate() {
      return true;
    }
  },
}));

import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

describe('CardsController', () => {
  let controller: CardsController;

  const cardsServiceMock = {
    create: jest.fn(),
    findAllByList: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const request = {
    user: {
      sub: 1,
      role: 'USER',
    },
  } as any;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule =
      await Test.createTestingModule({
        controllers: [CardsController],
        providers: [
          {
            provide: CardsService,
            useValue: cardsServiceMock,
          },
        ],
      }).compile();

    controller =
      module.get<CardsController>(CardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a card in a list', async () => {
      const dto = {
        title: 'Create authentication',
        description: 'Implement JWT authentication',
      };

      const card = {
        id: 1,
        ...dto,
        position: 0,
        listId: 1,
      };

      cardsServiceMock.create.mockResolvedValue(card);

      const result = await controller.create(
        1,
        request,
        dto,
      );

      expect(cardsServiceMock.create).toHaveBeenCalledWith(
        1,
        1,
        dto,
      );

      expect(result).toEqual(card);
    });
  });

  describe('findAllByList', () => {
    it('should return cards from a list', async () => {
      const cards = [
        {
          id: 1,
          title: 'Task 1',
          position: 0,
          listId: 1,
        },
      ];

      cardsServiceMock.findAllByList.mockResolvedValue(
        cards,
      );

      const result = await controller.findAllByList(
        1,
        request,
      );

      expect(
        cardsServiceMock.findAllByList,
      ).toHaveBeenCalledWith(1, 1);

      expect(result).toEqual(cards);
    });
  });

  describe('findOne', () => {
    it('should return a card', async () => {
      const card = {
        id: 1,
        title: 'Task 1',
        position: 0,
        listId: 1,
      };

      cardsServiceMock.findOne.mockResolvedValue(card);

      const result = await controller.findOne(
        1,
        request,
      );

      expect(
        cardsServiceMock.findOne,
      ).toHaveBeenCalledWith(1, 1);

      expect(result).toEqual(card);
    });
  });

  describe('update', () => {
    it('should update a card', async () => {
      const dto = {
        title: 'Updated task',
        position: 1,
      };

      const card = {
        id: 1,
        title: 'Updated task',
        position: 1,
        listId: 1,
      };

      cardsServiceMock.update.mockResolvedValue(card);

      const result = await controller.update(
        1,
        request,
        dto,
      );

      expect(
        cardsServiceMock.update,
      ).toHaveBeenCalledWith(1, 1, dto);

      expect(result).toEqual(card);
    });
  });

  describe('remove', () => {
    it('should delete a card', async () => {
      cardsServiceMock.remove.mockResolvedValue(
        undefined,
      );

      const result = await controller.remove(
        1,
        request,
      );

      expect(
        cardsServiceMock.remove,
      ).toHaveBeenCalledWith(1, 1);

      expect(result).toBeUndefined();
    });
  });
});