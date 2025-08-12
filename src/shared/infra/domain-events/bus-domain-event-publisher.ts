import { Inject, Injectable } from '@nestjs/common';
import { DomainEvent } from '@shared/domain/event/domain-event';
import { DomainEventPublisher } from '@shared/domain/event/domain-event-publisher';
import { EVENT_BUS, type EventBus } from '@shared/domain/event/event-bus';

@Injectable()
export class BusDomainEventPublisher implements DomainEventPublisher {
  constructor(@Inject(EVENT_BUS) private readonly bus: EventBus) {}

  async publish(event: DomainEvent[]): Promise<void> {
    if (event.length === 0) {
      return;
    }

    await this.bus.publish(event);
  }
}
