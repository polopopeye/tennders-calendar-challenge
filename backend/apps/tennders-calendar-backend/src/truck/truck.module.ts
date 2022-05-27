import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TruckController } from './controllers/truck.controller';
import { TruckEntity } from './entities/truck.entity';
import { TruckService } from './services/truck.service';

@Module({
  imports: [TypeOrmModule.forFeature([TruckEntity])],
  controllers: [TruckController],
  providers: [TruckService],
  exports: [TruckService],
})
export class TruckModule {}
