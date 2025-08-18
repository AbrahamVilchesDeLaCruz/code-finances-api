import { PositiveNumberValueObject } from '../value-objects/positive-number.value-object';

export class PageSize extends PositiveNumberValueObject {
  constructor(value: number) {
    super(value);
  }

  static fromPrimitives(offset: number): PageSize {
    return new PageSize(offset);
  }
}
