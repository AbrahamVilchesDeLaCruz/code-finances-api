import { StringValueObject } from '@shared/domain/value-objects/string.value-object';
import { InvalidRevenueDescription } from './invalid-revenue-description.exception';

export class RevenueDescription extends StringValueObject {
  private readonly MAX_LENGTH = 60;

  constructor(value: string) {
    super(value);
    this.ensureIsNotEmpty(value);
    this.ensureMaxLength(value, this.MAX_LENGTH);
  }

  private ensureIsNotEmpty(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new InvalidRevenueDescription(
        'Revenue description cannot be empty.',
      );
    }
  }

  private ensureMaxLength(value: string, maxLength: number): void {
    if (value.length > maxLength) {
      throw new InvalidRevenueDescription(
        `Revenue description cannot exceed ${maxLength} characters.`,
      );
    }
  }
}
