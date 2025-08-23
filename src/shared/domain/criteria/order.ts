import { OrderBy } from './order-by';
import { OrderType, OrderTypes } from './order-type';

export type OrderPrimitives = {
  orderBy: string | null;
  orderType: string | null;
};

export class Order {
  constructor(
    readonly orderBy: OrderBy,
    readonly orderType: OrderType,
  ) {}

  static none(): Order {
    return new Order(new OrderBy(''), new OrderType(OrderTypes.NONE));
  }

  static fromPrimitives(primitives: OrderPrimitives): Order {
    const { orderBy, orderType } = primitives;

    if (orderBy === null || orderType === null) {
      return Order.none();
    }

    return new Order(
      new OrderBy(orderBy),
      new OrderType(orderType as OrderTypes),
    );
  }
}
