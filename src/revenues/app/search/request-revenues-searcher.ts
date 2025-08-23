import { Request } from '@shared/app/requests';
import { FiltersPrimitives } from '@shared/domain/criteria/filter';

export class RequestRevenueSearcher implements Request {
  constructor(
    public filters: FiltersPrimitives[],
    public orderBy: string | null,
    public order: string | null,
    public pageNumber: number | null,
    public pageSize: number | null,
  ) {}
}
