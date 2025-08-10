import { UuidMother } from '../../shared/domain/uuid-mother';
import { AccountId } from '@revenues/domain/account-id';

export class AccountIdMother {
  static create(value: string): AccountId {
    return new AccountId(value);
  }

  static random(): AccountId {
    return this.create(UuidMother.random());
  }
}
