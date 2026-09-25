import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Request } from 'express';

import { Role } from '../../generated/prisma/enums';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

type AuthenticatedRequest = Request & {
  user: {
    sub: number;
    role: Role;
  };
};

@ApiTags('Users')
@ApiBearerAuth()
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get the authenticated user profile',
  })
  @ApiOkResponse({
    description: 'Authenticated user profile',
    schema: {
      example: {
        id: 1,
        email: 'fallou@example.com',
        name: 'Fallou Gaye',
        role: 'USER',
        createdAt: '2026-09-24T20:00:00.000Z',
        updatedAt: '2026-09-24T20:00:00.000Z',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Missing, invalid or expired JWT',
    schema: {
      example: {
        statusCode: 401,
        message: 'Authentication required',
        error: 'Unauthorized',
      },
    },
  })
  getMe(@Req() request: AuthenticatedRequest) {
    return this.usersService.findMe(request.user.sub);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update a user',
    description:
      'A user can update their own profile. Only an administrator can update another user or change a user role.',
  })
  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiOkResponse({
    description: 'User successfully updated',
    schema: {
      example: {
        id: 1,
        email: 'fallou@example.com',
        name: 'Fallou Gaye',
        role: 'USER',
        createdAt: '2026-09-24T20:00:00.000Z',
        updatedAt: '2026-09-24T21:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid user id or request body',
    schema: {
      example: {
        statusCode: 400,
        message: ['email must be an email'],
        error: 'Bad Request',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Missing, invalid or expired JWT',
    schema: {
      example: {
        statusCode: 401,
        message: 'Authentication required',
        error: 'Unauthorized',
      },
    },
  })
  @ApiForbiddenResponse({
    description:
      'The authenticated user is not allowed to perform this modification',
    schema: {
      example: {
        statusCode: 403,
        message: 'You are not allowed to modify this user',
        error: 'Forbidden',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'User not found',
        error: 'Not Found',
      },
    },
  })
  @ApiConflictResponse({
    description: 'Email already in use',
    schema: {
      example: {
        statusCode: 409,
        message: 'Email already in use',
        error: 'Conflict',
      },
    },
  })
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.usersService.update(
      id,
      request.user.sub,
      request.user.role,
      updateUserDto,
    );
  }
}