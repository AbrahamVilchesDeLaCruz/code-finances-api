import { Request } from '@shared/app/requests';

export class RequestRevenueCreator implements Request {
  constructor(
    public readonly id: string,
    public readonly amount: number,
  ) {}
}
