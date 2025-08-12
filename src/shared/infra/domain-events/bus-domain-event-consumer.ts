import { Inject, Injectable } from '@nestjs/common';
import { DomainEvent } from '@shared/domain/event/domain-event';
import { DomainEventConsumer } from '@shared/domain/event/domain-event-consumer';
import { EVENT_BUS, type EventBus } from '@shared/domain/event/event-bus';

@Injectable()
export class BusDomainEventConsumer implements DomainEventConsumer {
  constructor(@Inject(EVENT_BUS) private readonly bus: EventBus) {}

  async consume(
    queueName: string,
    bindingKey: string,
    exchangeName: string,
    domainEvent: typeof DomainEvent,
    handler: (event: DomainEvent) => Promise<void>,
  ): Promise<void> {
    return this.bus.consume(
      queueName,
      bindingKey,
      exchangeName,
      domainEvent,
      handler,
    );
  }
}
