import { Module } from '@nestjs/common';
import { HealthCheckGetController } from '../controllers/health-check-get.controller';

@Module({
  imports: [],
  controllers: [HealthCheckGetController],
  providers: [],
})
export class SharedModule {}
