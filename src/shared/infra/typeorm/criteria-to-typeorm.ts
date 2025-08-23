import {
  Like,
  Not,
  MoreThan,
  LessThan,
  MoreThanOrEqual,
  LessThanOrEqual,
  IsNull,
  Equal,
} from 'typeorm';
import { Criteria } from '@shared/domain/criteria/criteria';
import { Filter } from '@shared/domain/criteria/filter';

type TypeOrmOptions = {
  order?: { [key: string]: string };
  where?: { [key: string]: string };
  take?: number;
  skip?: number;
  relations?: string[];
};

export class CriteriaToTypeOrmConverter {
  constructor(private readonly criteria: Criteria) {}

  convert(relations: string[] = []): TypeOrmOptions {
    const query: TypeOrmOptions = {};

    if (this.criteria.hasFilters()) {
      query.where = this.criteria.filters.value.reduce((acc, filter) => {
        return { ...acc, ...this.generateWhereQuery(filter) };
      }, {});
    }

    if (this.criteria.hasOrder()) {
      query.order = {
        [this.criteria.order.orderBy.value]:
          this.criteria.order.orderType.value,
      };
    }

    if (
      this.criteria.pagination.pageSize !== null &&
      this.criteria.pagination.pageSize.value > 0
    ) {
      query.take = this.criteria.pagination.pageSize.value;

      if (this.criteria.pagination.pageNumber !== null) {
        query.skip =
          this.criteria.pagination.pageSize.value *
          (this.criteria.pagination.pageNumber.value - 1);
      }
    }

    if (relations.length > 0) {
      query.relations = relations;
    }

    return query;
  }

  private generateWhereQuery(filter: Filter) {
    const field = filter.field.value;

    if (filter.operator.isEqual()) {
      return { [field]: Equal(filter.value.value) };
    }

    if (filter.operator.isNotEqual()) {
      return { [field]: Not(Equal(filter.value.value)) };
    }

    if (filter.operator.isMoreThan()) {
      return { [field]: MoreThan(filter.value.value) };
    }

    if (filter.operator.isLessThan()) {
      return { [field]: LessThan(filter.value.value) };
    }

    if (filter.operator.isMoreThanOrEqual()) {
      return { [field]: MoreThanOrEqual(filter.value.value) };
    }

    if (filter.operator.isLessThanOrEqual()) {
      return { [field]: LessThanOrEqual(filter.value.value) };
    }

    if (filter.operator.isContains()) {
      return { [field]: Like(filter.value.value) };
    }

    if (filter.operator.isNotContains()) {
      return { [field]: Not(Like(filter.value.value)) };
    }

    if (filter.operator.isNull()) {
      return { [field]: IsNull() };
    }

    if (filter.operator.isNotNull()) {
      return { [field]: Not(IsNull()) };
    }
  }
}
