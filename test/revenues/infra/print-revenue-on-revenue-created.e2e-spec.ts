/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../src/app.module';
import { RevenueCreator } from '@revenues/app/create/revenue-creator';
import { PrintRevenueOnRevenueCreated } from '@revenues/infra/print-revenue-on-revenue-created';
import { RevenueCreatorMother } from '../app/create/revenue-creator-mother';

const RUN_E2E = process.env.RUN_E2E === 'true';

(RUN_E2E ? describe : describe.skip)('RevenueCreator Integration', () => {
  let app: INestApplication;
  let revenueCreator: RevenueCreator;
  let spyHandle: jest.SpyInstance;
  let logSpy: jest.SpyInstance;

  beforeAll(async () => {
    // Espiamos handle pero dejamos que se ejecute normalmente
    spyHandle = jest.spyOn(PrintRevenueOnRevenueCreated.prototype, 'handle');

    // Espiamos console.log para verificar la salida
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

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
    logSpy.mockRestore();
    spyHandle.mockRestore();
  });

  it('should publish event and handle it', async () => {
    const request = RevenueCreatorMother.random();

    const handlerCalled = new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error('Handler no se llamó a tiempo')),
        5000,
      );

      spyHandle.mockImplementationOnce(async function (this: any, ...args) {
        try {
          // llamamos al método real para no bloquear la lógica
          const original =
            PrintRevenueOnRevenueCreated.prototype.handle.bind(this);
          await original(...args);
          resolve();
        } finally {
          clearTimeout(timeout);
        }
      });
    });
    await revenueCreator.execute(request);

    // Esperamos a que el handler se ejecute o falle por timeout
    await handlerCalled;

    expect(spyHandle).toHaveBeenCalled();
  }, 10000);
});
