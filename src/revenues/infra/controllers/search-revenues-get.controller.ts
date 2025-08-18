import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Revenues')
@Controller('revenues')
export class SearchRevenuesGetController {
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Search revenues',
    description: 'Endpoint to search revenues',
  })
  async handle(): Promise<void> {
    return Promise.resolve();
  }
}
