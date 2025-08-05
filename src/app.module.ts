import { Module } from '@nestjs/common';
import { SharedModule } from './shared/infra/framework/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
