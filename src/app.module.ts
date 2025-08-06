import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/infra/framework/shared.module';
import { RevenuesModule } from '@revenues/infra/framework/revenues.module';

@Module({
  imports: [SharedModule, RevenuesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
