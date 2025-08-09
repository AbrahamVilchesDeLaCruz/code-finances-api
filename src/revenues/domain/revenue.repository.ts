import { Revenue } from './revenue';

export const REVENUE_REPOSITORY = 'REVENUE_REPOSITORY';

export interface RevenueRepository {
  save(revenue: Revenue): Promise<void>;
}
