import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import C from '../common';

export class ProviderParamsDto {
  @ApiProperty({
    enum: Object.values(C),
  })
  @IsString()
  entity: string;
}

export class ProviderQueryDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiProperty({
    required: false,
    enum: [
      'created_at',
      'name',
      'transaction_date',
      'order_date',
      'reorder_date',
    ],
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiProperty({
    required: false,
    enum: ['ASC', 'DESC'],
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
