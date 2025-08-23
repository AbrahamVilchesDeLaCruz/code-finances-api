import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchRevenuesGetQuery } from './queries/search-revenues-get.query';
import { RevenuesSearcher } from '@revenues/app/search/revenues-searcher';
import { RequestRevenueSearcher } from '@revenues/app/search/request-revenues-searcher';
import { QueryParamsCriteriaFilterParser } from '@shared/infra/typeorm/ query-params-criteria-filter-parser';

@ApiTags('Revenues')
@Controller('revenues')
export class SearchRevenuesGetController {
  constructor(
    @Inject(RevenuesSearcher) private readonly searcher: RevenuesSearcher,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Search revenues',
    description: 'Endpoint to search revenues',
  })
  async handle(@Query() query: SearchRevenuesGetQuery): Promise<object> {
    const { filters, order, orderBy, pageSize, pageNumber } = query;
    const filtersPrimitives = QueryParamsCriteriaFilterParser.parse(filters);

    const { revenues } = await this.searcher.execute(
      new RequestRevenueSearcher(
        filtersPrimitives,
        order ?? null,
        orderBy ?? null,
        pageSize ?? null,
        pageNumber ?? null,
      ),
    );

    return {
      data: revenues,
      meta: {
        count: revenues.length,
        totalPages: Math.ceil(revenues.length / (pageSize ?? 1)),
      },
    };
  }
}
