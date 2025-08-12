import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthCheckGetController } from '@shared/infra/controllers/health-check-get.controller';
import config from '@shared/infra/config/env.config';
import { EVENT_BUS } from '@shared/domain/event/event-bus';
import { AmqpEventBus } from '../domain-events/amqp-event-bus';
import { DOMAIN_EVENT_PUBLISHER } from '@shared/domain/event/domain-event-publisher';
import { BusDomainEventPublisher } from '../domain-events/bus-domain-event-publisher';
import { DOMAIN_EVENT_CONSUMER } from '@shared/domain/event/domain-event-consumer';
import { BusDomainEventConsumer } from '../domain-events/bus-domain-event-consumer';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV || '.env.local'}`],
      isGlobal: true,
      load: [config],
    }),
  ],
  controllers: [HealthCheckGetController],
  providers: [
    {
      provide: EVENT_BUS,
      useClass: AmqpEventBus,
    },
    {
      provide: DOMAIN_EVENT_PUBLISHER,
      useClass: BusDomainEventPublisher,
    },
    {
      provide: DOMAIN_EVENT_CONSUMER,
      useClass: BusDomainEventConsumer,
    },
  ],
  exports: [EVENT_BUS, DOMAIN_EVENT_PUBLISHER, DOMAIN_EVENT_CONSUMER],
})
export class SharedModule {}
