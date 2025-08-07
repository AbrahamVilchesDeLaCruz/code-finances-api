import { UseCase } from '@shared/app/use-case';
import { RequestRevenueCreator } from './request-revenue-creator';

export class RevenueCreator implements UseCase {
  constructor() {}

  async execute(request: RequestRevenueCreator): Promise<void> {
    return Promise.resolve();
  }
}
