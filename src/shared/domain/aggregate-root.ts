/* import { DomainEvent } from '@shared/domain/events/domain-event'; */

export abstract class Aggregate {
  //public readonly domainEvents: DomainEvent[] = [];

  /*  public record(event: DomainEvent): void {
    this.domainEvents.push(event);
  } */

  /* public pullDomainEvents(): DomainEvent[] {
    return this.domainEvents.splice(0, this.domainEvents.length);
  } */

  public abstract toPrimitives(): object;

  public abstract fromPrimitives(data: object): void;
}
