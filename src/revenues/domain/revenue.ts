import { RevenueAmount } from './revenue-amount';
import { RevenueId } from './revenue-id';

export class Revenue {
  constructor(
    public readonly id: RevenueId,
    public readonly amount: RevenueAmount,
  ) {}

  static create(id: string, amount: number): Revenue {
    return new Revenue(new RevenueId(id), new RevenueAmount(amount));
  }
}
