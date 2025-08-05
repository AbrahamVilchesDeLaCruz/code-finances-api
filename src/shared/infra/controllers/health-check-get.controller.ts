import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthCheckGetController {
  @Get('health')
  getHealthCheck() {
    return { status: 'OK' };
  }
}
