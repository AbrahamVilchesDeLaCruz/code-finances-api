import { Module } from '@nestjs/common';
import { RevenueCreator } from '@revenues/app/create/revenue-creator';

@Module({
  imports: [],
  controllers: [],
  providers: [RevenueCreator],
})
export class RevenuesModule {}
