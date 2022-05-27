import { Controller, Get } from '@nestjs/common';
import { RedisMessageTransporterService } from './redis_message_transporter.service';

@Controller()
export class RedisMessageTransporterController {
  constructor(
    private readonly redisMessageTransporterService: RedisMessageTransporterService,
  ) {}

  @Get()
  getHello(): string {
    return this.redisMessageTransporterService.getHello();
  }
}
