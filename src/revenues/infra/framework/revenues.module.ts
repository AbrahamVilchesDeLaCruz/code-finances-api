import { Module } from '@nestjs/common';
import { RevenueCreator } from '@revenues/app/create/revenue-creator';
import { TypeormRevenueRepository } from '../typeorm/typeorm-revenue-repository';
import { REVENUE_REPOSITORY } from '@revenues/domain/revenue.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    RevenueCreator,
    {
      provide: REVENUE_REPOSITORY,
      useClass: TypeormRevenueRepository,
    },
  ],
})
export class RevenuesModule {}
