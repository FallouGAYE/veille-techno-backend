import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    example: 'Create login page',
    description: 'Title of the card',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    example: 'Create the login page with email and password fields',
    description: 'Description of the card',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
