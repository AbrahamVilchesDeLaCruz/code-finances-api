import { RevenueAmount } from '@revenues/domain/revenue-amount';
import { NumberMother } from '../../shared/domain/number-mother';

export class RevenueAmountMother {
  static create(value: number): RevenueAmount {
    return new RevenueAmount(value);
  }

  static random(): RevenueAmount {
    return this.create(NumberMother.randomFloat(0, 50000, 2));
  }
}
