import { FiltersPrimitives } from './filter';
import { Filters } from './filters';
import { Order, OrderPrimitives } from './order';
import { OrderTypes } from './order-type';
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

  hasFilters(): boolean {
    return this.filters.value.length > 0;
  }

  hasOrder(): boolean {
    return this.order.orderType.value !== OrderTypes.NONE;
  }
}
