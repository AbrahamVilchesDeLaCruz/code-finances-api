import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RevenueRepository } from '@revenues/domain/revenue.repository';
import { RevenueEntity } from './revenue.entity';
import { Repository } from 'typeorm';
import { Revenue } from '@revenues/domain/revenue';
import { RevenueMapper } from './revenue-mapper';
import { Criteria } from '@shared/domain/criteria/criteria';
import { CriteriaToTypeOrmConverter } from '@shared/infra/typeorm/criteria-to-typeorm';

@Injectable()
export class TypeormRevenueRepository implements RevenueRepository {
  constructor(
    @InjectRepository(RevenueEntity)
    private readonly model: Repository<RevenueEntity>,
  ) {}

  async match(criteria: Criteria): Promise<Revenue[]> {
    const converter = new CriteriaToTypeOrmConverter(criteria);
    const revenues = await this.model.find(converter.convert());
    return revenues.map((revenue) => RevenueMapper.toDomain(revenue));
  }

  async save(revenue: Revenue): Promise<void> {
    const entity = RevenueMapper.toPersistence(revenue);
    await this.model.save(entity);
  }
}
