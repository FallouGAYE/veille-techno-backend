import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateCardDto {
  @ApiPropertyOptional({
    example: 'Create secure login page',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    example: 'Add email, password and JWT authentication',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 1,
  })
  @IsOptional()
  @IsInt()
  position?: number;

  @ApiPropertyOptional({
    example: 2,
    description: 'ID of the destination list',
  })
  @IsOptional()
  @IsInt()
  listId?: number;
}
