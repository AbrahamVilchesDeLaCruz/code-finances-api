export class InvalidRevenueAmount extends Error {
  constructor(value: number) {
    super(`Invalid revenue amount: ${value}`);
  }
}
