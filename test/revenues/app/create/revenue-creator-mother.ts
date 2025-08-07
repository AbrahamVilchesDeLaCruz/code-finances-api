import { RequestRevenueCreator } from '@revenues/app/create/request-revenue-creator';

export class RevenueCreatorMother {
  static request(): RequestRevenueCreator {
    return new RequestRevenueCreator();
  }
}
