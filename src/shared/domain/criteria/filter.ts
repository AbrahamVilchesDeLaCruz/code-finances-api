import { FilterField } from './filter-field';
import { FilterOperator, OperatorOptions } from './filter-operator';
import { FilterValue } from './filter-value';

export type FiltersPrimitives = {
  field: string;
  operator: string;
  value: string;
};

export class Filter {
  constructor(
    readonly field: FilterField,
    readonly operator: FilterOperator,
    readonly value: FilterValue,
  ) {}

  toPrimitives(): FiltersPrimitives {
    return {
      field: this.field.value,
      operator: this.operator.value,
      value: this.value?.value ?? null,
    };
  }

  static fromPrimitives(primitives: FiltersPrimitives): Filter {
    const { field, operator, value } = primitives;

    return new Filter(
      new FilterField(field),
      new FilterOperator(operator as OperatorOptions),
      new FilterValue(value),
    );
  }
}
