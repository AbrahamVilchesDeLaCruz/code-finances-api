import { PositiveNumberValueObject } from '../value-objects/positive-number.value-object';

export class PageNumber extends PositiveNumberValueObject {
  constructor(value: number) {
    super(value);
  }

  static fromPrimitives(offset: number): PageNumber {
    return new PageNumber(offset);
  }
}
