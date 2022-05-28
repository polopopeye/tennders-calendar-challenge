import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisProvider } from '../database/redis.provider';
import { EventsController } from './controllers/events.controller';
import { EventEntity } from './entities/events.entity';
import { EventService } from './services/events.services';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  controllers: [EventsController],
  providers: [EventService, RedisProvider],
  exports: [EventService],
})
export class EventModule {}
