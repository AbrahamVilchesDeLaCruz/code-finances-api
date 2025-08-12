import { UseCase } from '@shared/app/use-case';
import { RequestRevenueCreator } from './request-revenue-creator';
import {
  REVENUE_REPOSITORY,
  type RevenueRepository,
} from '@revenues/domain/revenue.repository';
import { Revenue } from '@revenues/domain/revenue';
import { Inject, Injectable } from '@nestjs/common';
import {
  DOMAIN_EVENT_PUBLISHER,
  type DomainEventPublisher,
} from '@shared/domain/event/domain-event-publisher';

@Injectable()
export class RevenueCreator implements UseCase {
  constructor(
    @Inject(REVENUE_REPOSITORY) private readonly repository: RevenueRepository,
    @Inject(DOMAIN_EVENT_PUBLISHER)
    private readonly publisher: DomainEventPublisher,
  ) {}

  async execute(request: RequestRevenueCreator): Promise<void> {
    const { id, amount, date, equityId, accountId, description } = request;

    const revenue = Revenue.create(
      id,
      amount,
      date,
      equityId,
      accountId,
      description,
    );

    await this.repository.save(revenue);

    await this.publisher.publish(revenue.pullDomainEvents());
  }
}
