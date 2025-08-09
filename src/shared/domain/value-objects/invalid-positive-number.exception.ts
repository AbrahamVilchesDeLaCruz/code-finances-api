export class InvalidPositive extends Error {
  constructor(value: number) {
    super(`The value ${value} must be a positive number`);
  }
}
