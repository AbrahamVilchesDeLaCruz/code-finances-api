import { FiltersPrimitives } from './filter';
import { Filters } from './filters';
import { Order, OrderPrimitives } from './order';
import { Pagination, PaginationPrimitives } from './pagination';

export class Criteria {
  constructor(
    readonly filters: Filters,
    readonly order: Order,
    readonly pagination: Pagination,
  ) {}

  static fromPrimitives(
    filters: FiltersPrimitives[],
    order: OrderPrimitives,
    pagination: PaginationPrimitives,
  ): Criteria {
    return new Criteria(
      Filters.fromPrimitives(filters),
      Order.fromPrimitives(order),
      Pagination.fromPrimitives(pagination),
    );
  }
}
