import { StringValueObject } from '../value-objects/string.value-object';

export enum OrderTypes {
  ASC = 'ASC',
  DESC = 'DESC',
  NONE = 'NONE',
}

export class OrderType extends StringValueObject {
  constructor(public readonly value: string) {
    super(value);
    this.ensureOrderTypeIsValid();
  }

  private ensureOrderTypeIsValid(): void {
    if (!Object.values(OrderTypes).includes(this.value as OrderTypes)) {
      throw new Error(`Invalid order type: ${this.value}`);
    }
  }
}
