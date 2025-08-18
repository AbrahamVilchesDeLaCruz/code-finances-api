import { Filter, FiltersPrimitives } from './filter';

export class Filters {
  constructor(readonly value: Filter[]) {}

  static fromPrimitives(filters: FiltersPrimitives[]): Filters {
    const filterInstances = filters.map((filter) =>
      Filter.fromPrimitives(filter),
    );

    return new Filters(filterInstances);
  }
}
