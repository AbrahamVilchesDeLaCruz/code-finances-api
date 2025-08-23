import { FiltersPrimitives } from '@shared/domain/criteria/filter';

export class QueryParamsCriteriaFilterParser {
  static parse(filters: string | undefined): FiltersPrimitives[] {
    if (!filters) {
      return [];
    }

    const parsedFilters = JSON.parse(filters) as FiltersPrimitives[];
    if (false === Array.isArray(parsedFilters)) {
      //throw new FiltersQueryParamsShouldBeAnArrayOfObjects();
      throw new Error('Filters query params should be an array of objects');
    }

    parsedFilters.forEach((filter) => {
      if (
        !Object.prototype.hasOwnProperty.call(filter, 'field') ||
        !Object.prototype.hasOwnProperty.call(filter, 'operator')
      ) {
        //throw new FiltersQueryParamsShouldHaveProps();
        throw new Error(
          'Filters query params should have field and operator properties',
        );
      }
    });

    return parsedFilters.map((filter) => {
      let value: string | number | null = null;

      if (filter['value'] !== undefined && filter['value'] !== null) {
        const raw = filter['value'];
        value = !isNaN(Number(raw)) ? Number(raw) : String(raw);
      }

      return {
        field: filter['field'],
        operator: filter['operator'],
        value: value,
      } as FiltersPrimitives;
    });
  }
}
