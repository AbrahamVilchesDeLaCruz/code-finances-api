export class CouldNotConnectToBus extends Error {
  constructor() {
    super('Could not connect to the event bus');
  }
}
