import { Revenue } from '@revenues/domain/revenue';
import { RevenueEntity } from './revenue.entity';

export class RevenueMapper {
  static toDomain(entity: RevenueEntity): Revenue {
    const { id, amount, date, equityId, accountId, description } = entity;

    return Revenue.fromPrimitives({
      id,
      amount: Number(amount),
      date,
      equityId,
      accountId,
      description,
    });
  }

  static toPersistence(revenue: Revenue): RevenueEntity {
    const entity = new RevenueEntity();

    const { id, amount, date, equityId, accountId, description } =
      revenue.toPrimitives();

    entity.id = id;
    entity.amount = amount;
    entity.date = date;
    entity.equityId = equityId;
    entity.accountId = accountId;
    entity.description = description;

    return entity;
  }
}
