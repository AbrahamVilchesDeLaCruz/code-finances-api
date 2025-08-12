import { DomainEvent } from './domain-event';

export const EVENT_BUS = 'EVENT_BUS';

export interface EventBus {
  publish(domainEvents: DomainEvent[]): Promise<void>;

  consume(
    queueName: string,
    bindingKey: string,
    exchangeName: string,
    domainEvent: any,
    handler: (event: DomainEvent) => Promise<void>,
  ): Promise<void>;
}
