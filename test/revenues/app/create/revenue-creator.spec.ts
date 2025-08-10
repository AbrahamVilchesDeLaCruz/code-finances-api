import { Test, TestingModule } from '@nestjs/testing';
import { RevenueCreator } from '@revenues/app/create/revenue-creator';
import { RevenueCreatorMother } from './revenue-creator-mother';
import { RevenueMother } from '../../domain/revenue-mother';
import {
  REVENUE_REPOSITORY,
  RevenueRepository,
} from '@revenues/domain/revenue.repository';
import { mock } from 'jest-mock-extended';
import { InvalidRevenueDescription } from '@revenues/domain/invalid-revenue-description.exception';
import { InvalidPositive } from '@shared/domain/value-objects/invalid-positive-number.exception';
import { MotherCreator } from '../../../shared/domain/mother-creator';
import { InvalidRevenueAmount } from '@revenues/domain/invalid-revenue-amount.exception';

describe('RevenueCreator Unit', () => {
  let revenueCreator: RevenueCreator;
  const revenueRepositoryMock = mock<RevenueRepository>();

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        RevenueCreator,
        {
          provide: REVENUE_REPOSITORY,
          useValue: revenueRepositoryMock,
        },
      ],
    }).compile();

    revenueCreator = moduleRef.get<RevenueCreator>(RevenueCreator);
  });

  it('Create a new revenue', async () => {
    const request = RevenueCreatorMother.random();

    const revenue = RevenueMother.from(request);

    await revenueCreator.execute(request);

    expect(revenueRepositoryMock.save).toHaveBeenCalledWith(revenue);
  });

  it('Shoudl throw an error when description is empty', async () => {
    const request = RevenueCreatorMother.invalid({
      invalidDescription: ' ',
    });

    await expect(revenueCreator.execute(request)).rejects.toBeInstanceOf(
      InvalidRevenueDescription,
    );
  });

  it('Should throw an error when amount is negative', async () => {
    const request = RevenueCreatorMother.invalid({
      invalidAmount: -100,
    });

    await expect(revenueCreator.execute(request)).rejects.toBeInstanceOf(
      InvalidPositive,
    );
  });

  it('Should throw an error when description is too long (more than 50 characters)', async () => {
    const request = RevenueCreatorMother.invalid({
      invalidDescription: MotherCreator.random().string.alpha({
        length: {
          min: 61,
          max: 100,
        },
      }),
    });

    await expect(revenueCreator.execute(request)).rejects.toBeInstanceOf(
      InvalidRevenueDescription,
    );
  });

  it('Should throw an Invalid revenue amount when revenue amount is more than 50000', async () => {
    const request = RevenueCreatorMother.invalid({
      invalidAmount: MotherCreator.random().number.float({
        min: 50001,
        max: 100000,
      }),
    });

    await expect(revenueCreator.execute(request)).rejects.toBeInstanceOf(
      InvalidRevenueAmount,
    );
  });
});
