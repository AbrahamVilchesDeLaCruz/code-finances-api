import { Inject, Injectable } from '@nestjs/common';
import { RevenueCreatedEvent } from '@revenues/domain/revenue-created.event';
import {
  DOMAIN_EVENT_CONSUMER,
  type DomainEventConsumer,
} from '@shared/domain/event/domain-event-consumer';
import { Handler } from '@shared/infra/domain-events/handler';

@Injectable()
export class PrintRevenueOnRevenueCreated extends Handler {
  constructor(@Inject(DOMAIN_EVENT_CONSUMER) consumer: DomainEventConsumer) {
    super(consumer);
  }
  get queueName(): string {
    return 'revenue_created_queue';
  }
  get eventName(): string {
    return 'code_finances.revenues.1.event.revenue.created';
  }
  get domainEvent() {
    return RevenueCreatedEvent;
  }
  get exchangeName(): string {
    return 'ms_code_finances';
  }

  async handle(event: RevenueCreatedEvent): Promise<void> {
    console.log('Revenue created event received:', event.data);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
  }
}
