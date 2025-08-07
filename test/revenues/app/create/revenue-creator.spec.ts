import { Test, TestingModule } from '@nestjs/testing';
import { RevenueCreator } from '@revenues/app/create/revenue-creator';
import { RevenueCreatorMother } from './revenue-creator-mother';

describe('RevenueCreator', () => {
  let revenueCreator: RevenueCreator;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [RevenueCreator],
    }).compile();

    revenueCreator = moduleRef.get<RevenueCreator>(RevenueCreator);
  });

  it('Create a new revenue', async () => {
    const request = RevenueCreatorMother.request();

    const result = await revenueCreator.execute(request);

    expect(result).toBeUndefined();
  });
});
