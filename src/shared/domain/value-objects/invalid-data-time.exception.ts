export class InvalidDateTime extends Error {
  constructor(dateTime: string) {
    super(`The datetime ${dateTime} is not valid`);
  }
}
