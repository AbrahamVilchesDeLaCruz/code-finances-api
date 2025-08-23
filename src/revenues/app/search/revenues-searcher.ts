import { UseCase } from '@shared/app/use-case';
import { ResponseRevenuesSearcher } from './response-revenues-searcher';
import { RequestRevenueSearcher } from './request-revenues-searcher';
import { Criteria } from '@shared/domain/criteria/criteria';
import { Inject, Injectable } from '@nestjs/common';
import {
  REVENUE_REPOSITORY,
  type RevenueRepository,
} from '@revenues/domain/revenue.repository';

@Injectable()
export class RevenuesSearcher implements UseCase {
  constructor(
    @Inject(REVENUE_REPOSITORY) private repository: RevenueRepository,
  ) {}

  async execute(
    request: RequestRevenueSearcher,
  ): Promise<ResponseRevenuesSearcher> {
    const { filters, orderBy, order, pageNumber, pageSize } = request;

    const criteria = Criteria.fromPrimitives(
      filters,
      { orderBy, orderType: order },
      { pageNumber, pageSize },
    );

    const revenues = await this.repository.match(criteria);

    return Promise.resolve(
      new ResponseRevenuesSearcher(
        revenues.map((revenue) => revenue.toPrimitives()),
      ),
    );
  }
}
