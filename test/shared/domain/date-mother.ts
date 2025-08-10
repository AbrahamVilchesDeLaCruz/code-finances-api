import { MotherCreator } from './mother-creator';

export class DateMother {
  static randomEarlier() {
    return MotherCreator.random().date.past({
      years: 10,
    });
  }
}
