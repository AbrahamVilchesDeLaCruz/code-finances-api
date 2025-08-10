import { Request } from '@shared/app/requests';

export class RequestRevenueCreator implements Request {
  constructor(
    public readonly id: string,
    public readonly amount: number,
    public readonly date: Date,
    public readonly equityId: string,
    public readonly accountId: string,
    public readonly description: string,
  ) {}
}
