/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../../src/app.module';
import request from 'supertest';

const RUN_E2E = process.env.RUN_E2E === 'true';

(RUN_E2E ? describe : describe.skip)(
  'SearchRevenuesGetController (e2e)',
  () => {
    let app: INestApplication;

    beforeAll(async () => {
      const module = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
      app = module.createNestApplication();
      await app.init();
    });

    it('/GET /revenues should return 200', async () => {
      const response = await request(app.getHttpServer()).get('/revenues');

      expect(response.status).toBe(HttpStatus.OK);
    });

    afterAll(async () => {
      await app.close();
    });
  },
);
