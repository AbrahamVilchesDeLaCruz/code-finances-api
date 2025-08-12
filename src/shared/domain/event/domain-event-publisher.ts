import { DomainEvent } from './domain-event';

export const DOMAIN_EVENT_PUBLISHER = 'DOMAIN_EVENT_PUBLISHER';

export interface DomainEventPublisher {
  publish(event: DomainEvent[]): Promise<void>;
}
