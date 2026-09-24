import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateListDto {
  @ApiProperty({
    example: 'To Do',
    description: 'Title of the Kanban list',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}
