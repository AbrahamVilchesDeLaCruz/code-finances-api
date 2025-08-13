import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../src/app.module';
import { RevenueCreator } from '@revenues/app/create/revenue-creator';
import { PrintRevenueOnRevenueCreated } from '@revenues/infra/print-revenue-on-revenue-created';
import { RevenueCreatorMother } from '../app/create/revenue-creator-mother';

describe('RevenueCreator Integration', () => {
  let app: INestApplication;
  let revenueCreator: RevenueCreator;
  let spyHandle: jest.SpyInstance;

  beforeAll(async () => {
    // Enganchamos el spy ANTES de app.init()
    spyHandle = jest
      .spyOn(PrintRevenueOnRevenueCreated.prototype, 'handle')
      .mockImplementation(async () => Promise.resolve());

    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    await new Promise((res) => setTimeout(res, 700));

    revenueCreator = module.get<RevenueCreator>(RevenueCreator);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should publish event and handle it', async () => {
    const request = RevenueCreatorMother.random();
    await revenueCreator.execute(request);

    // Espera un poco para que el evento se propague (ajusta según tu implementación)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(spyHandle).toHaveBeenCalled();
  }, 10000);
});
