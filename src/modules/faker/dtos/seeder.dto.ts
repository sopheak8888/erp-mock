import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class SeedDataDto {
  @ApiProperty({
    description: 'Number of mock records to generate',
  })
  @IsNumber()
  @Min(1)
  count?: number;
}
