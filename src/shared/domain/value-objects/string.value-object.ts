import { ValueObject } from './value-object';

export class StringValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }
}
