import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register a new user',
  })
  @ApiBody({
    type: RegisterDto,
  })
  @ApiCreatedResponse({
    description: 'User successfully registered',
    schema: {
      example: {
        id: 1,
        email: 'fallou@example.com',
        name: 'Fallou Gaye',
        role: 'USER',
        createdAt: '2026-09-24T20:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid registration data',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'email must be an email',
          'password must be longer than or equal to 8 characters',
        ],
        error: 'Bad Request',
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
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Log in a user',
  })
  @ApiBody({
    type: LoginDto,
  })
  @ApiOkResponse({
    description: 'User successfully logged in',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid request body',
    schema: {
      example: {
        statusCode: 400,
        message: ['email must be an email'],
        error: 'Bad Request',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid email or password',
    schema: {
      example: {
        statusCode: 401,
        message: 'Invalid email or password',
        error: 'Unauthorized',
      },
    },
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}