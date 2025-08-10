import { RequestRevenueCreator } from '@revenues/app/create/request-revenue-creator';
import { RevenueIdMother } from '../../domain/revenue-id-mother';
import { RevenueAmountMother } from '../../domain/revenue-amount-mother';
import { RevenueDateMother } from '../../domain/revenue-date-mother';
import { EquityIdMother } from '../../domain/equity-id-mother';
import { AccountIdMother } from '../../domain/account-id-mother';
import { RevenueDescriptionMother } from '../../domain/revenue-description-mother';

export class RevenueCreatorMother {
  static random(): RequestRevenueCreator {
    return new RequestRevenueCreator(
      RevenueIdMother.random().value,
      RevenueAmountMother.random().value,
      RevenueDateMother.random().value,
      EquityIdMother.random().value,
      AccountIdMother.random().value,
      RevenueDescriptionMother.random().value,
    );
  }

  static invalid(options: {
    invalidDescription?: string;
    invalidAmount?: number;
  }): RequestRevenueCreator {
    return new RequestRevenueCreator(
      RevenueIdMother.random().value,
      options.invalidAmount ?? RevenueAmountMother.random().value,
      RevenueDateMother.random().value,
      EquityIdMother.random().value,
      AccountIdMother.random().value,
      options.invalidDescription ?? RevenueDescriptionMother.random().value,
    );
  }
}
