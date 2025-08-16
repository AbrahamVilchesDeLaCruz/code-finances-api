import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequestRevenueCreator } from '@revenues/app/create/request-revenue-creator';
import { RevenueCreator } from '@revenues/app/create/revenue-creator';
import { CreateRevenuePostPayload } from './payloads/create-revenue-post.payload';
import { UuidValueObject } from '@shared/domain/value-objects/uuid.value-object';

@ApiTags('Revenues')
@Controller('revenues')
export class CreateRevenuePostController {
  constructor(private readonly creator: RevenueCreator) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    description:
      'Creates a new revenue entry if the `id` does not exist, or updates an existing one if the `id` is provided. Revenue represents payments received from external entities, such as salary, business income, or donations.',
  })
  async handle(@Body() payload: CreateRevenuePostPayload): Promise<void> {
    const { id, amount, date, description, accountId } = payload;

    await this.creator.execute(
      new RequestRevenueCreator(
        id,
        amount,
        new Date(date),
        UuidValueObject.random().value,
        accountId,
        description,
      ),
    );
  }
}
