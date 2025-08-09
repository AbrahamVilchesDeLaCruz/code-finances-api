import { Test, TestingModule } from '@nestjs/testing';
import { RevenueCreator } from '@revenues/app/create/revenue-creator';
import { RevenueCreatorMother } from './revenue-creator-mother';
import { RevenueMother } from '../../domain/revenue-mother';
import {
  REVENUE_REPOSITORY,
  RevenueRepository,
} from '@revenues/domain/revenue.repository';
import { mock } from 'jest-mock-extended';

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
    const request = RevenueCreatorMother.request();

    const revenue = RevenueMother.from(request);

    await revenueCreator.execute(request);

    expect(revenueRepositoryMock.save).toHaveBeenCalledWith(revenue);
  });
});
