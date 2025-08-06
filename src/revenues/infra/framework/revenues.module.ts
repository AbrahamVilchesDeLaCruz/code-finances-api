import { Module } from '@nestjs/common';
import { RevenueCreator } from '../../app/revenue-creator';

@Module({
  imports: [],
  controllers: [],
  providers: [RevenueCreator],
})
export class RevenuesModule {}
