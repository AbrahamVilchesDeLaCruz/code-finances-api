import { DomainEvent } from '@shared/domain/event/domain-event';

export class RevenueCreatedEvent extends DomainEvent {
  eventName(): string {
    return 'code_finances.revenues.1.event.revenue.created';
  }
}
