import { Test, TestingModule } from '@nestjs/testing';

jest.mock('../auth/guards/jwt-auth.guard', () => ({
  JwtAuthGuard: class JwtAuthGuard {
    canActivate() {
      return true;
    }
  },
}));

import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

describe('ListsController', () => {
  let controller: ListsController;

  const listsServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
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

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListsController],
      providers: [
        {
          provide: ListsService,
          useValue: listsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ListsController>(ListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return lists of the authenticated user', async () => {
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

      listsServiceMock.findAll.mockResolvedValue(lists);

      const result = await controller.findAll(request);

      expect(listsServiceMock.findAll).toHaveBeenCalledWith(1);
      expect(result).toEqual(lists);
    });
  });

  describe('create', () => {
    it('should create a list for the authenticated user', async () => {
      const dto = {
        title: 'To Do',
      };

      const createdList = {
        id: 1,
        title: 'To Do',
        position: 0,
        ownerId: 1,
      };

      listsServiceMock.create.mockResolvedValue(createdList);

      const result = await controller.create(request, dto);

      expect(listsServiceMock.create).toHaveBeenCalledWith(
        1,
        dto,
      );

      expect(result).toEqual(createdList);
    });
  });

  describe('update', () => {
    it('should update a list', async () => {
      const dto = {
        title: 'Done',
        position: 2,
      };

      const updatedList = {
        id: 1,
        title: 'Done',
        position: 2,
        ownerId: 1,
      };

      listsServiceMock.update.mockResolvedValue(updatedList);

      const result = await controller.update(
        1,
        request,
        dto,
      );

      expect(listsServiceMock.update).toHaveBeenCalledWith(
        1,
        1,
        dto,
      );

      expect(result).toEqual(updatedList);
    });
  });

  describe('remove', () => {
    it('should delete a list', async () => {
      listsServiceMock.remove.mockResolvedValue(undefined);

      const result = await controller.remove(
        1,
        request,
      );

      expect(listsServiceMock.remove).toHaveBeenCalledWith(
        1,
        1,
      );

      expect(result).toBeUndefined();
    });
  });
});