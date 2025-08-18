import { PageNumber } from './page-number';
import { PageSize } from './page-size';

export type PaginationPrimitives = {
  pageNumber: number | null;
  pageSize: number | null;
};

export class Pagination {
  constructor(
    readonly pageNumber: PageNumber,
    readonly pageSize: PageSize,
  ) {
    this.ensureIsValidPagination();
  }

  private ensureIsValidPagination() {
    if (
      this.pageNumber !== null &&
      this.pageNumber.value > 0 &&
      (this.pageSize === null || this.pageSize.value === 0)
    ) {
      throw new Error(
        'Page size must be exists when page number is greater than 0',
      );
    }
  }

  static fromPrimitives(primitives: PaginationPrimitives): Pagination {
    return new Pagination(
      PageNumber.fromPrimitives(primitives.pageNumber ?? 0),
      PageSize.fromPrimitives(primitives.pageSize ?? 0),
    );
  }
}
