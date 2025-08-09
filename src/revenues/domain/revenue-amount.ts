import { PositiveNumberValueObject } from '@shared/domain/value-objects/positive-number.value-object';
import { InvalidRevenueAmount } from './invalid-revenue-amount.exception';

const MIN_VALUE = 0;
const MAX_VALUE = 50000;

export class RevenueAmount extends PositiveNumberValueObject {
  constructor(value: number) {
    super(value);
    this.ensureRevenueAmountIsValid(value);
  }

  private ensureRevenueAmountIsValid(value: number): void {
    if (value <= MIN_VALUE || value > MAX_VALUE) {
      throw new InvalidRevenueAmount(value);
    }
  }
}
