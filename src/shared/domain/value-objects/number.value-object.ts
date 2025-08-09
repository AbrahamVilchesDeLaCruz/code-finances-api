import { InvalidNumber } from './invalid-number.exception';
import { ValueObject } from './value-object';

export class NumberValueObject extends ValueObject<number> {
  constructor(value: number) {
    super(value);
    this.ensureValidNumberValueObject(value);
  }
  private ensureValidNumberValueObject(value: number): void {
    if (isNaN(value) || !isFinite(value) || typeof value !== 'number') {
      throw new InvalidNumber(value);
    }
  }
}
