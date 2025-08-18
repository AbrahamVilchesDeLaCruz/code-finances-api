import { StringValueObject } from '../value-objects/string.value-object';

enum OperatorOptions {
  EQUAL = '=',
  NOT_EQUAL = '!=',
  MORE_THAN = '>',
  LESS_THAN = '<',
  MORE_THAN_OR_EQUAL = '>=',
  LESS_THAN_OR_EQUAL = '<=',
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS',
  NULL = 'NULL',
  NOT_NULL = 'NOT_NULL',
}

export class FilterOperator extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureOperatorIsValid();
  }

  private ensureOperatorIsValid() {
    if (
      !Object.values(OperatorOptions).includes(this.value as OperatorOptions)
    ) {
      throw new Error(`Invalid filter operator: ${this.value}`);
    }
  }
}
