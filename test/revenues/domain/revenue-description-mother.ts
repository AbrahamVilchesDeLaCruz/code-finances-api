import { RevenueDescription } from '@revenues/domain/revenue-description';
import { MotherCreator } from '../../shared/domain/mother-creator';

export class RevenueDescriptionMother {
  static create(value: string): RevenueDescription {
    return new RevenueDescription(value);
  }

  static random(): RevenueDescription {
    return this.create(MotherCreator.random().finance.transactionType());
  }
}
