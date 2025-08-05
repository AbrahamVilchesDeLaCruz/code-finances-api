import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../../../../src/app.module';
import request from 'supertest';

describe('HealthCheckerGetController E2E Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET /health should return OK`, async () => {
    const url = `/health`;
    const responseExpected = { status: 'OK' };

    const response = await request(app.getHttpServer()).get(url);

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toEqual(responseExpected);
  });

  afterAll(async () => {
    await app.close();
  });
});
