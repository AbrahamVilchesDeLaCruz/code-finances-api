import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RevenueMother } from '../domain/revenue-mother';
import { RevenueEntity } from '@revenues/infra/typeorm/revenue.entity';
import { TypeormRevenueRepository } from '@revenues/infra/typeorm/typeorm-revenue-repository';
import { RevenueCreatorMother } from '../app/create/revenue-creator-mother';

describe('TypeormRevenueRepository Integration', () => {
  let repository: TypeormRevenueRepository;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: +process.env.DB_PORT!,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [RevenueEntity],
          synchronize: false,
        }),
        TypeOrmModule.forFeature([RevenueEntity]),
      ],
      providers: [TypeormRevenueRepository],
    }).compile();

    repository = moduleRef.get<TypeormRevenueRepository>(
      TypeormRevenueRepository,
    );
    dataSource = moduleRef.get<DataSource>(DataSource);
  });

  it('should save a revenue', async () => {
    const request = RevenueCreatorMother.random();

    const revenue = RevenueMother.from(request);
    await repository.save(revenue);

    const saved = await dataSource
      .getRepository(RevenueEntity)
      .findOneBy({ id: revenue.id.value });

    expect(saved).toBeDefined();
    expect(Number(saved!.amount)).toBe(revenue.amount.value);
  });

  afterEach(async () => {
    await dataSource.getRepository(RevenueEntity).clear();
  });
});
