import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('SHARED')
@Controller('health')
export class HealthCheckGetController {
  @Get()
  @ApiOperation({
    summary: 'Health Check',
    description: 'Returns the status of the API',
  })
  @ApiOkResponse({
    description: 'The API is healthy',
    schema: {
      example: {
        status: 'OK',
      },
    },
  })
  handle() {
    return { status: 'OK' };
  }
}
