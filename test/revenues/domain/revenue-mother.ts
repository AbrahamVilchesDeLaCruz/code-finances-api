import { RequestRevenueCreator } from '@revenues/app/create/request-revenue-creator';
import { AccountId } from '@revenues/domain/account-id';
import { EquityId } from '@revenues/domain/equity-id';
import { Revenue } from '@revenues/domain/revenue';
import { RevenueAmount } from '@revenues/domain/revenue-amount';
import { RevenueDate } from '@revenues/domain/revenue-date';
import { RevenueDescription } from '@revenues/domain/revenue-description';
import { RevenueId } from '@revenues/domain/revenue-id';

export class RevenueMother {
  static create(
    id: string,
    amount: number,
    date: Date,
    equityId: string,
    accountId: string,
    description: string,
  ): Revenue {
    return new Revenue(
      new RevenueId(id),
      new RevenueAmount(amount),
      new RevenueDate(date),
      new EquityId(equityId),
      new AccountId(accountId),
      new RevenueDescription(description),
    );
  }

  static from(request: RequestRevenueCreator): Revenue {
    const { id, amount, date, equityId, accountId, description } = request;
    return this.create(id, amount, date, equityId, accountId, description);
  }
}
