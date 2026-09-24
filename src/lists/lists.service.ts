import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Injectable()
export class ListsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createListDto: CreateListDto) {
    return this.prisma.list.create({
      data: {
        title: createListDto.title,
        ownerId: userId,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.list.findMany({
      where: {
        ownerId: userId,
      },
      orderBy: {
        position: 'asc',
      },
    });
  }

  async update(
    listId: number,
    userId: number,
    updateListDto: UpdateListDto,
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
        'You are not allowed to modify this list',
      );
    }

    return this.prisma.list.update({
      where: {
        id: listId,
      },
      data: updateListDto,
    });
  }

  async remove(listId: number, userId: number) {
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
        'You are not allowed to delete this list',
      );
    }

    await this.prisma.list.delete({
      where: {
        id: listId,
      },
    });
  }
}