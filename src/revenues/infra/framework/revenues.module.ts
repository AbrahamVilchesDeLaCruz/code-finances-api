import { Module } from '@nestjs/common';
import { RevenueCreator } from '@revenues/app/create/revenue-creator';
import { TypeormRevenueRepository } from '../typeorm/typeorm-revenue-repository';
import { REVENUE_REPOSITORY } from '@revenues/domain/revenue.repository';
import { PrintRevenueOnRevenueCreated } from '../print-revenue-on-revenue-created';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevenueEntity } from '../typeorm/revenue.entity';
import { CreateRevenuePostController } from '../controllers/create-revenue-post.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RevenueEntity])],
  controllers: [CreateRevenuePostController],
  providers: [
    RevenueCreator,
    {
      provide: REVENUE_REPOSITORY,
      useClass: TypeormRevenueRepository,
    },
    PrintRevenueOnRevenueCreated,
  ],
})
export class RevenuesModule {}
