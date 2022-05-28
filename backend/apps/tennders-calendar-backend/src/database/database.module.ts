import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../config';

import { EventEntity } from '../events/entities/events.entity';
import { TruckEntity } from '../truck/entities/truck.entity';

export const MongoDBModule = [
  // DATABASE MODULE
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
        entities: [TruckEntity, EventEntity],
        authSource: 'tennders',
      };
    },
  }),
];
