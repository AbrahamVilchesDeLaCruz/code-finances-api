export class InvalidNumber extends Error {
  constructor(value) {
    super(`The value ${value} must be a valid number`);
  }
}
