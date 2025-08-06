import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthCheckGetController } from '@shared/infra/controllers/health-check-get.controller';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV || '.env.local'}`],
      isGlobal: true,
    }),
  ],
  controllers: [HealthCheckGetController],
  providers: [],
})
export class SharedModule {}
