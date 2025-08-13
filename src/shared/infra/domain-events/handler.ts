import { DomainEvent } from '@shared/domain/event/domain-event';
import { DomainEventConsumer } from '@shared/domain/event/domain-event-consumer';
import { OnModuleInit } from '@nestjs/common';

export abstract class Handler implements OnModuleInit {
  abstract get queueName(): string;

  abstract get eventName(): string;

  abstract get domainEvent(): typeof DomainEvent;

  abstract get exchangeName(): string;

  abstract handle(event: DomainEvent): Promise<void>;

  protected constructor(private readonly consumer: DomainEventConsumer) {}

  public async init(): Promise<void> {
    await this.consumer.consume(
      this.queueName,
      this.eventName,
      this.exchangeName,
      this.domainEvent,
      this.handle.bind(this) as (event: DomainEvent) => Promise<void>,
    );
  }

  async onModuleInit(): Promise<void> {
    await this.init();
  }
}
