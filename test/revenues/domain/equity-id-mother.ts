import { UuidMother } from '../../shared/domain/uuid-mother';
import { EquityId } from '@revenues/domain/equity-id';

export class EquityIdMother {
  static create(value: string): EquityId {
    return new EquityId(value);
  }

  static random(): EquityId {
    return this.create(UuidMother.random());
  }
}
