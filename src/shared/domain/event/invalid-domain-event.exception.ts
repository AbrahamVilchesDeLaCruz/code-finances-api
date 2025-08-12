export class InvalidDomainEvent extends Error {
  constructor(body: string) {
    super(`Invalid domain event with body ${body}`);
  }
}
