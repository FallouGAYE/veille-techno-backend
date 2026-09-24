import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Request } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListsService } from './lists.service';

type AuthenticatedRequest = Request & {
  user: {
    sub: number;
    role: string;
  };
};

@ApiTags('Lists')
@ApiBearerAuth()
@Controller('api/lists')
@UseGuards(JwtAuthGuard)
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get the authenticated user lists',
  })
  @ApiOkResponse({
    description: 'Lists successfully retrieved',
  })
  @ApiUnauthorizedResponse({
    description: 'Missing, invalid or expired JWT',
  })
  findAll(@Req() request: AuthenticatedRequest) {
    return this.listsService.findAll(request.user.sub);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new list',
  })
  @ApiCreatedResponse({
    description: 'List successfully created',
  })
  create(
    @Req() request: AuthenticatedRequest,
    @Body() createListDto: CreateListDto,
  ) {
    return this.listsService.create(
      request.user.sub,
      createListDto,
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a list',
  })
  @ApiOkResponse({
    description: 'List successfully updated',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: AuthenticatedRequest,
    @Body() updateListDto: UpdateListDto,
  ) {
    return this.listsService.update(
      id,
      request.user.sub,
      updateListDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a list',
  })
  @ApiNoContentResponse({
    description: 'List successfully deleted',
  })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: AuthenticatedRequest,
  ) {
    await this.listsService.remove(
      id,
      request.user.sub,
    );
  }
}