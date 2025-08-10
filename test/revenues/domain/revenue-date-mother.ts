import { RevenueDate } from '@revenues/domain/revenue-date';
import { DateMother } from '../../shared/domain/date-mother';

export class RevenueDateMother {
  static create(value: Date | string): RevenueDate {
    return new RevenueDate(value);
  }

  static random(): RevenueDate {
    return this.create(DateMother.randomEarlier());
  }
}
