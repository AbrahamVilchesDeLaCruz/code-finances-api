export class InvalidUuid extends Error {
  constructor(uuid: string) {
    super(`The uuid ${uuid} is not valid`);
  }
}
