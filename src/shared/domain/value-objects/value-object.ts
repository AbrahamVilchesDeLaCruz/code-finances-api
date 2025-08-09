import { InvalidArgumentException } from './invalid-argument.exception';

export type Primitives = string | number | boolean | Date;

export abstract class ValueObject<T extends Primitives> {
  public readonly value: T;

  protected constructor(value: T) {
    this.value = value;
    this.ensureValueIsDefined(value);
  }

  private ensureValueIsDefined(value: T): void {
    if (value === null || value === undefined) {
      throw new InvalidArgumentException('Value must be defined');
    }
  }

  equals(other: ValueObject<T>): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      other.value === this.value
    );
  }

  notEquals(other: ValueObject<T>): boolean {
    return !this.equals(other);
  }

  toString(): string {
    return this.value.toString();
  }
}
