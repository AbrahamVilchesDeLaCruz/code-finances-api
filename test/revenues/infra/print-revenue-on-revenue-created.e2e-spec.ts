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

    // Creamos una promesa que se resuelve cuando se llama el handler
    let resolveHandler: () => void;
    const handlerCalled = new Promise<void>((resolve, reject) => {
      resolveHandler = resolve;
      // opcional: puedes agregar un timeout para no colgar el test si algo falla
      setTimeout(
        () => reject(new Error('Handler no se llamó a tiempo')),
        5000,
      ).unref();
    });

    // Spy que resuelve la promesa solo una vez
    spyHandle.mockImplementationOnce(() => {
      resolveHandler();
    });

    await revenueCreator.execute(request);

    // Esperamos a que el handler se ejecute o falle por timeout
    await handlerCalled;

    expect(spyHandle).toHaveBeenCalled();
  }, 10000);
});
