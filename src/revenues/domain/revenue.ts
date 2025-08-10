import { AggregateRoot } from '@shared/domain/aggregate-root';
import { RevenueAmount } from './revenue-amount';
import { RevenueId } from './revenue-id';
import { RevenueDescription } from './revenue-description';
import { RevenueDate } from './revenue-date';
import { EquityId } from './equity-id';
import { AccountId } from './account-id';

export type RevenueReadModel = {
  id: string;
  amount: number;
  date: Date;
  equityId: string;
  accountId: string;
  description: string;
};

export class Revenue extends AggregateRoot<RevenueReadModel> {
  constructor(
    public readonly id: RevenueId,
    public readonly amount: RevenueAmount,
    public readonly date: RevenueDate,
    public readonly equityId: EquityId,
    public readonly accountId: AccountId,
    public readonly description: RevenueDescription,
  ) {
    super();
  }

  static create(
    id: string,
    amount: number,
    date: Date,
    equityId: string,
    accountId: string,
    description: string,
  ): Revenue {
    return this.fromPrimitives({
      id,
      amount,
      date,
      equityId,
      accountId,
      description,
    });

    //Evento de dominio
  }

  public toPrimitives(): RevenueReadModel {
    return {
      id: this.id.value,
      amount: this.amount.value,
      date: this.date.value,
      equityId: this.equityId.value,
      accountId: this.accountId.value,
      description: this.description.value,
    };
  }

  public static fromPrimitives(data: RevenueReadModel): Revenue {
    return new Revenue(
      new RevenueId(data.id),
      new RevenueAmount(data.amount),
      new RevenueDate(data.date),
      new EquityId(data.equityId),
      new AccountId(data.accountId),
      new RevenueDescription(data.description),
    );
  }
}
