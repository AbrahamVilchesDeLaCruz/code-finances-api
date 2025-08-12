import { DateTimeValueObject } from '../value-objects/date-time.value-object';
import { UuidValueObject } from '../value-objects/uuid.value-object';
import { Event } from './event';

export abstract class DomainEvent implements Event {
  constructor(
    public readonly aggregateId: UuidValueObject,
    public readonly data: unknown,
    public readonly eventId: UuidValueObject = UuidValueObject.random(),
    public readonly occurredOn: DateTimeValueObject = DateTimeValueObject.now(),
  ) {}

  toPrimitives(): object {
    return {
      aggregateId: this.aggregateId.value,
      data: this.data,
      eventId: this.eventId.value,
      occurredOn: this.occurredOn.value.getTime(),
    };
  }

  abstract eventName(): string;

  decode(): string {
    return JSON.stringify(this.toPrimitives());
  }

  encode(data: string): object {
    return JSON.parse(data) as object;
  }
}
