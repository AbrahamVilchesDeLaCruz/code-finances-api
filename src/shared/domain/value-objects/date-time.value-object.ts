import { InvalidDateTime } from './invalid-data-time.exception';

export class DateTimeValueObject {
  public readonly value: Date;

  constructor(value: string | Date) {
    if (value instanceof Date) {
      this.value = value;
    } else {
      const parsedDate = new Date(value);
      if (isNaN(parsedDate.getTime())) {
        throw new InvalidDateTime(value);
      }
      this.value = parsedDate;
    }
  }

  public static now(): DateTimeValueObject {
    return new DateTimeValueObject(new Date());
  }

  public toString(): string {
    return this.value.toISOString();
  }

  public isLaterTo(other: DateTimeValueObject): boolean {
    return this.value.getTime() > other.value.getTime();
  }

  public isEarlierTo(other: DateTimeValueObject): boolean {
    return this.value.getTime() < other.value.getTime();
  }

  public isEqualTo(other: DateTimeValueObject): boolean {
    return this.value.getTime() === other.value.getTime();
  }
}
