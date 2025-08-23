import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchRevenuesGetQuery {
  @ApiProperty({
    name: 'filters',
    type: String,
    required: false,
    description: 'Array of filter objects',
  })
  @IsOptional()
  @IsString()
  filters?: string;

  @ApiProperty({ name: 'order', type: String, required: false })
  @IsOptional()
  @IsString()
  order?: string;

  @ApiProperty({ name: 'orderBy', type: String, required: false })
  @IsOptional()
  @IsString()
  orderBy?: string;

  @ApiProperty({ name: 'pageSize', type: Number, required: false })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  pageNumber?: number;

  @ApiProperty({ name: 'pageNumber', type: Number, required: false })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  pageSize?: number;
}
