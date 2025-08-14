import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RevenueRepository } from '@revenues/domain/revenue.repository';
import { RevenueEntity } from './revenue.entity';
import { Repository } from 'typeorm';
import { Revenue } from '@revenues/domain/revenue';
import { RevenueMapper } from './revenue-mapper';

@Injectable()
export class TypeormRevenueRepository implements RevenueRepository {
  constructor(
    @InjectRepository(RevenueEntity)
    private readonly model: Repository<RevenueEntity>,
  ) {}

  async save(revenue: Revenue): Promise<void> {
    const entity = RevenueMapper.toPersistence(revenue);
    await this.model.save(entity);
  }
}
