import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as argon2 from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import { Role } from '../../generated/prisma/enums';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findMe(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(
    targetUserId: number,
    authenticatedUserId: number,
    authenticatedUserRole: Role,
    updateUserDto: UpdateUserDto,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: targetUserId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isOwner = targetUserId === authenticatedUserId;
    const isAdmin = authenticatedUserRole === Role.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException(
        'You are not allowed to modify this user',
      );
    }

    if (updateUserDto.role !== undefined && !isAdmin) {
      throw new ForbiddenException(
        'Only an administrator can change user roles',
      );
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingEmail = await this.prisma.user.findUnique({
        where: {
          email: updateUserDto.email,
        },
      });

      if (existingEmail) {
        throw new ConflictException('Email already in use');
      }
    }

    let hashedPassword: string | undefined;

    if (updateUserDto.password) {
      hashedPassword = await argon2.hash(updateUserDto.password);
    }

    return this.prisma.user.update({
      where: {
        id: targetUserId,
      },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        role: updateUserDto.role,
        ...(hashedPassword && {
          password: hashedPassword,
        }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}