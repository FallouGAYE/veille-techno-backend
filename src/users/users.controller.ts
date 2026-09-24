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
  ApiBearerAuth,
  ApiBody,
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
  @ApiUnauthorizedResponse({
    description: 'Missing, invalid or expired JWT',
  })
  getMe(@Req() request: AuthenticatedRequest) {
    return this.usersService.findMe(request.user.sub);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update a user',
  })
  @ApiBody({
    type: UpdateUserDto,
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