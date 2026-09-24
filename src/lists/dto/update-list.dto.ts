import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateListDto {
  @ApiPropertyOptional({
    example: 'In Progress',
    description: 'New title of the list',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Position of the list',
  })
  @IsOptional()
  @IsInt()
  position?: number;
}
