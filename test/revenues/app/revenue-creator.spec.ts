import { Test, TestingModule } from '@nestjs/testing';
import { RevenueCreator } from '@revenues/app/create/revenue-creator';

describe('RevenueCreator', () => {
  let revenueCreator: RevenueCreator;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [RevenueCreator],
    }).compile();

    revenueCreator = moduleRef.get<RevenueCreator>(RevenueCreator);
  });

  it('should be defined', () => {
    expect(revenueCreator).toBeDefined();
  });
});
