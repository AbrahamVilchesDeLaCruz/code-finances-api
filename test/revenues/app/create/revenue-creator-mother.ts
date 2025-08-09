import { RequestRevenueCreator } from '@revenues/app/create/request-revenue-creator';
import { RevenueIdMother } from '../../domain/revenue-id-mother';
import { RevenueAmountMother } from '../../domain/revenue-amount-mother';

export class RevenueCreatorMother {
  static request(): RequestRevenueCreator {
    return new RequestRevenueCreator(
      RevenueIdMother.random().value,
      RevenueAmountMother.random().value,
    );
  }
}
