import { InvalidPositive } from './invalid-positive-number.exception';
import { NumberValueObject } from './number.value-object';

export class PositiveNumberValueObject extends NumberValueObject {
  constructor(value: number) {
    super(value);
    this.ensureIsPositive(value);
  }

  private ensureIsPositive(value: number): void {
    if (value < 0) {
      throw new InvalidPositive(value);
    }
  }
}
