export class InvalidRevenueDescription extends Error {
  constructor(reason: string) {
    super(`Invalid revenue description because: ${reason}`);
  }
}
