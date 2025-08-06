import { Test } from '@nestjs/testing';
import { RevenueCreator } from '../../../src/revenues/app/revenue-creator';

describe('RevenueCreator', () => {
  let revenueCreator: RevenueCreator;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [RevenueCreator],
    }).compile();

    revenueCreator = moduleRef.get<RevenueCreator>(RevenueCreator);
  });

  it('should be defined', () => {
    expect(revenueCreator).toBeDefined();
  });
});
