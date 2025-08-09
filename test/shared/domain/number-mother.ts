import { MotherCreator } from './mother-creator';

export class NumberMother {
  static randomFloat(min: number, max: number, fractionDigits: number): number {
    return MotherCreator.random().number.float({
      min,
      max,
      fractionDigits,
    });
  }
}
