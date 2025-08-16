import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../../src/app.module';
import { UuidValueObject } from '@shared/domain/value-objects/uuid.value-object';
import request from 'supertest';

const RUN_E2E = process.env.RUN_E2E === 'true';

(RUN_E2E ? describe : describe.skip)('CreateRevenuePostController E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  it('/POST /revenues should return 201', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await request(app.getHttpServer()).post('/revenues').send({
      id: UuidValueObject.random().value,
      amount: 1000,
      date: '2022-01-01',
      description: 'Salary from the company xxxxx',
      accountId: UuidValueObject.random().value,
    });
    expect(response.status).toBe(HttpStatus.CREATED);
  });

  afterAll(async () => {
    await app.close();
  });
});
