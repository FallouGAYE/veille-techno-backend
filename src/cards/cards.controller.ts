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
} from '@nestjs/swagger';

import { Request } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardsService } from './cards.service';

type AuthenticatedRequest = Request & {
  user: {
    sub: number;
    role: string;
  };
};

@ApiTags('Cards')
@ApiBearerAuth()
@Controller('api')
@UseGuards(JwtAuthGuard)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post('lists/:listId/cards')
  @ApiOperation({
    summary: 'Create a card in a list',
  })
  @ApiCreatedResponse({
    description: 'Card successfully created',
  })
  create(
    @Param('listId', ParseIntPipe) listId: number,
    @Req() request: AuthenticatedRequest,
    @Body() createCardDto: CreateCardDto,
  ) {
    return this.cardsService.create(
      listId,
      request.user.sub,
      createCardDto,
    );
  }

  @Get('lists/:listId/cards')
  @ApiOperation({
    summary: 'Get all cards from a list',
  })
  @ApiOkResponse({
    description: 'Cards successfully retrieved',
  })
  findAllByList(
    @Param('listId', ParseIntPipe) listId: number,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.cardsService.findAllByList(
      listId,
      request.user.sub,
    );
  }

  @Get('cards/:id')
  @ApiOperation({
    summary: 'Get a card by ID',
  })
  @ApiOkResponse({
    description: 'Card successfully retrieved',
  })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.cardsService.findOne(
      id,
      request.user.sub,
    );
  }

  @Patch('cards/:id')
  @ApiOperation({
    summary: 'Update or move a card',
  })
  @ApiOkResponse({
    description: 'Card successfully updated',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: AuthenticatedRequest,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardsService.update(
      id,
      request.user.sub,
      updateCardDto,
    );
  }

  @Delete('cards/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a card',
  })
  @ApiNoContentResponse({
    description: 'Card successfully deleted',
  })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: AuthenticatedRequest,
  ) {
    await this.cardsService.remove(
      id,
      request.user.sub,
    );
  }
}