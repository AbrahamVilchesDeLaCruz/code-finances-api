import { RequestRevenueCreator } from '@revenues/app/create/request-revenue-creator';
import { Revenue } from '@revenues/domain/revenue';
import { RevenueAmount } from '@revenues/domain/revenue-amount';
import { RevenueId } from '@revenues/domain/revenue-id';

export class RevenueMother {
  static create(id: string, amount: number): Revenue {
    return new Revenue(new RevenueId(id), new RevenueAmount(amount));
  }

  static from(request: RequestRevenueCreator): Revenue {
    const { id, amount } = request;
    return this.create(id, amount);
  }
}
