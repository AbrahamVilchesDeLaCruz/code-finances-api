import { StringValueObject } from '../value-objects/string.value-object';

export enum OrderTypes {
  ASC = 'ASC',
  DESC = 'DESC',
  NONE = 'NONE',
}

export class OrderType extends StringValueObject {
  constructor(public readonly value: OrderTypes) {
    super(value);
    this.ensureOrderTypeIsValid();
  }

  private ensureOrderTypeIsValid(): void {
    if (!Object.values(OrderTypes).includes(this.value)) {
      throw new Error(`Invalid order type: ${this.value}`);
    }
  }
}
