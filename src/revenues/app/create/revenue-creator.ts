import { UseCase } from '@shared/app/use-case';
import { RequestRevenueCreator } from './request-revenue-creator';
import {
  REVENUE_REPOSITORY,
  type RevenueRepository,
} from '@revenues/domain/revenue.repository';
import { Revenue } from '@revenues/domain/revenue';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RevenueCreator implements UseCase {
  constructor(
    @Inject(REVENUE_REPOSITORY) private readonly repository: RevenueRepository,
  ) {}

  async execute(request: RequestRevenueCreator): Promise<void> {
    const { id, amount } = request;

    const revenue = Revenue.create(id, amount);

    await this.repository.save(revenue);
  }
}
