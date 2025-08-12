import { DomainEvent } from './domain-event';

export const DOMAIN_EVENT_CONSUMER = 'DOMAIN_EVENT_CONSUMER';

export interface DomainEventConsumer {
  consume(
    queueName: string,
    bindingKey: string,
    exchangeName: string,
    domainEvent: typeof DomainEvent,
    handler: (event: DomainEvent) => Promise<void>,
  ): Promise<void>;
}
