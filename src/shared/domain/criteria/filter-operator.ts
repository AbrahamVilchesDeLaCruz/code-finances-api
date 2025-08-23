import { StringValueObject } from '../value-objects/string.value-object';

export enum OperatorOptions {
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
  constructor(value: OperatorOptions) {
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

  isEqual(): boolean {
    return (this.value as OperatorOptions) === OperatorOptions.EQUAL;
  }

  isNotEqual(): boolean {
    return (this.value as OperatorOptions) === OperatorOptions.NOT_EQUAL;
  }

  isMoreThan(): boolean {
    return (this.value as OperatorOptions) === OperatorOptions.MORE_THAN;
  }

  isLessThan(): boolean {
    return (this.value as OperatorOptions) === OperatorOptions.LESS_THAN;
  }

  isMoreThanOrEqual(): boolean {
    return (
      (this.value as OperatorOptions) === OperatorOptions.MORE_THAN_OR_EQUAL
    );
  }

  isLessThanOrEqual(): boolean {
    return (
      (this.value as OperatorOptions) === OperatorOptions.LESS_THAN_OR_EQUAL
    );
  }

  isContains(): boolean {
    return (this.value as OperatorOptions) === OperatorOptions.CONTAINS;
  }

  isNotContains(): boolean {
    return (this.value as OperatorOptions) === OperatorOptions.NOT_CONTAINS;
  }

  isNull(): boolean {
    return (this.value as OperatorOptions) === OperatorOptions.NULL;
  }

  isNotNull(): boolean {
    return (this.value as OperatorOptions) === OperatorOptions.NOT_NULL;
  }
}
