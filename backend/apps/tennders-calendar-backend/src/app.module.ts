import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { MongoDB } from './database/database.module';
import { TruckModule } from './truck/truck.module';

import config from './config';
import * as Joi from 'joi';

import { ConfigModule } from '@nestjs/config';
import { EventModule } from './events/events.module';

import { MongoDBModule } from './database/database.module';

@Module({
  imports: [
    // CONFIG MODULE
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URL: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        REDIS_CACHE_TIME_SECONDS: Joi.number().required(),
      }),
    }),

    ...MongoDBModule,
    TruckModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}
