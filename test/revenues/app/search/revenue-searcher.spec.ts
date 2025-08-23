import { Test, TestingModule } from '@nestjs/testing';
import { RevenuesSearcher } from '@revenues/app/search/revenues-searcher';
import {
  REVENUE_REPOSITORY,
  RevenueRepository,
} from '@revenues/domain/revenue.repository';
import { mock } from 'jest-mock-extended';
import {
  DOMAIN_EVENT_PUBLISHER,
  DomainEventPublisher,
} from '@shared/domain/event/domain-event-publisher';

describe('RevenueSearcher Unit', () => {
  let revenuesSearcher: RevenuesSearcher;

  const revenueRepositoryMock = mock<RevenueRepository>();
  const domainEventPublisherMock = mock<DomainEventPublisher>();

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        RevenuesSearcher,
        {
          provide: REVENUE_REPOSITORY,
          useValue: revenueRepositoryMock,
        },
        {
          provide: DOMAIN_EVENT_PUBLISHER,
          useValue: domainEventPublisherMock,
        },
      ],
    }).compile();

    revenuesSearcher = moduleRef.get<RevenuesSearcher>(RevenuesSearcher);
  });
});
