import { StringValueObject } from '@shared/domain/value-objects/string.value-object';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { InvalidUuid } from './invalid-uuid.exception';

export class UuidValueObject extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.validateUuid(value);
  }

  private validateUuid(uuid: string): void {
    if (false === uuidValidate(uuid)) {
      throw new InvalidUuid(uuid);
    }
  }

  public static random(): UuidValueObject {
    return new UuidValueObject(uuidv4());
  }
}
