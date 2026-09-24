import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    listId: number,
    userId: number,
    createCardDto: CreateCardDto,
  ) {
    const list = await this.prisma.list.findUnique({
      where: {
        id: listId,
      },
    });

    if (!list) {
      throw new NotFoundException('List not found');
    }

    if (list.ownerId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to add cards to this list',
      );
    }

    return this.prisma.card.create({
      data: {
        title: createCardDto.title,
        description: createCardDto.description,
        listId: listId,
      },
    });
  }

  async findAllByList(listId: number, userId: number) {
    const list = await this.prisma.list.findUnique({
      where: {
        id: listId,
      },
    });

    if (!list) {
      throw new NotFoundException('List not found');
    }

    if (list.ownerId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to access cards from this list',
      );
    }

    return this.prisma.card.findMany({
      where: {
        listId: listId,
      },
      orderBy: {
        position: 'asc',
      },
    });
  }

  async findOne(cardId: number, userId: number) {
    const card = await this.prisma.card.findUnique({
      where: {
        id: cardId,
      },
      include: {
        list: true,
      },
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    if (card.list.ownerId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to access this card',
      );
    }

    return card;
  }

  async update(
    cardId: number,
    userId: number,
    updateCardDto: UpdateCardDto,
  ) {
    const card = await this.prisma.card.findUnique({
      where: {
        id: cardId,
      },
      include: {
        list: true,
      },
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    if (card.list.ownerId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to modify this card',
      );
    }

    if (
      updateCardDto.listId !== undefined &&
      updateCardDto.listId !== card.listId
    ) {
      const destinationList = await this.prisma.list.findUnique({
        where: {
          id: updateCardDto.listId,
        },
      });

      if (!destinationList) {
        throw new NotFoundException(
          'Destination list not found',
        );
      }

      if (destinationList.ownerId !== userId) {
        throw new ForbiddenException(
          'You are not allowed to move this card to this list',
        );
      }
    }

    return this.prisma.card.update({
      where: {
        id: cardId,
      },
      data: {
        title: updateCardDto.title,
        description: updateCardDto.description,
        position: updateCardDto.position,
        listId: updateCardDto.listId,
      },
    });
  }

  async remove(cardId: number, userId: number) {
    const card = await this.prisma.card.findUnique({
      where: {
        id: cardId,
      },
      include: {
        list: true,
      },
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    if (card.list.ownerId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this card',
      );
    }

    await this.prisma.card.delete({
      where: {
        id: cardId,
      },
    });
  }
}