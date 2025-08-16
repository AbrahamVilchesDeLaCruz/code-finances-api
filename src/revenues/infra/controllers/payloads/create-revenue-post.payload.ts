/* eslint-disable @typescript-eslint/no-unsafe-call */
import { UuidValueObject } from '@shared/domain/value-objects/uuid.value-object';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateRevenuePostPayload {
  @ApiProperty({
    description: 'The unique identifier of the revenue',
    example: UuidValueObject.random().value,
  })
  @ValidateIf((o: CreateRevenuePostPayload) => o.id !== undefined)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'The amount of the revenue', example: 1000 })
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    description: 'The date of the revenue',
    example: '2022-01-01',
  })
  @IsNotEmpty()
  @IsString()
  date: string;

  @ApiProperty({
    description: 'The description of the revenue',
    example: 'Salary from the company xxxxx',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The unique identifier of the destination account',
    example: UuidValueObject.random().value,
  })
  @ValidateIf((o: CreateRevenuePostPayload) => o.accountId !== undefined)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  accountId: string;
}
