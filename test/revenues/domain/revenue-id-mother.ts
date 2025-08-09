import { RevenueId } from '@revenues/domain/revenue-id';
import { UuidMother } from '../../shared/domain/uuid-mother';

export class RevenueIdMother {
  static create(value: string): RevenueId {
    return new RevenueId(value);
  }

  static random(): RevenueId {
    return this.create(UuidMother.random());
  }
}
