import { RevenueReadModel } from '@revenues/domain/revenue';
import { Response } from '@shared/app/response';

export class ResponseRevenuesSearcher implements Response {
  constructor(readonly revenues: RevenueReadModel[]) {}
}
