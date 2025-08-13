import { Injectable } from '@nestjs/common';
import { RevenueRepository } from '@revenues/domain/revenue.repository';

@Injectable()
export class TypeormRevenueRepository implements RevenueRepository {
  async save(): Promise<void> {
    // This method should contain the logic to save a revenue using TypeORM.
    // For now, it's just a placeholder.
    console.log('Saving revenue using TypeORM repository...');
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
  }
}
