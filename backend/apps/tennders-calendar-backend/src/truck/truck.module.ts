import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisProvider } from '../database/redis.provider';
// import { RedisModule } from '../database/redis.module';
import { TruckController } from './controllers/truck.controller';
import { TruckEntity } from './entities/truck.entity';
import { TruckService } from './services/truck.service';

@Module({
  imports: [TypeOrmModule.forFeature([TruckEntity])],
  controllers: [TruckController],
  providers: [TruckService, RedisProvider],
  exports: [TruckService],
})
export class TruckModule {}
