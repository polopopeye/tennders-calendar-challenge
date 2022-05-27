import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { MongoDB } from './database/database.module';
import { TruckModule } from './truck/truck.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import config from './config';
import * as Joi from 'joi';

import { ConfigModule } from '@nestjs/config';
import { TruckEntity } from './truck/entities/truck.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URL: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configuration: ConfigType<typeof config> = config()) => {
        const url = configuration.mongodb.url;

        return {
          type: 'mongodb',
          url,
          useUnifiedTopology: true,
          synchronize: true,
          ssl: false,
          useNewUrlParser: true,
          // This normally works, idk why is not working (I figure why..., but it's  OK for me to include all entities here, manually)
          // entities: [__dirname + '/**/*.entity{.ts,.js}'],
          entities: [TruckEntity],
          authSource: 'tennders',
        };
      },
    }),

    TruckModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
