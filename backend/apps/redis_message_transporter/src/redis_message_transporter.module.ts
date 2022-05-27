import { Module } from '@nestjs/common';
import { RedisMessageTransporterController } from './redis_message_transporter.controller';
import { RedisMessageTransporterService } from './redis_message_transporter.service';

@Module({
  imports: [],
  controllers: [RedisMessageTransporterController],
  providers: [RedisMessageTransporterService],
})
export class RedisMessageTransporterModule {}
