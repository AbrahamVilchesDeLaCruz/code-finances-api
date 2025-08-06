import { Global, Module } from '@nestjs/common';
import { HealthCheckGetController } from '../controllers/health-check-get.controller';
import { ConfigModule } from '@nestjs/config';

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
