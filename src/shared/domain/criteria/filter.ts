import { FilterField } from './filter-field';
import { FilterOperator } from './filter-operator';
import { FilterValue } from './filter-value';

export type FiltersPrimitives = {
  field: string;
  operator: string;
  value: string | null;
};

export class Filter {
  constructor(
    readonly field: FilterField,
    readonly operator: FilterOperator,
    readonly value: FilterValue | null,
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
      new FilterOperator(operator),
      value ? new FilterValue(value) : null,
    );
  }
}
