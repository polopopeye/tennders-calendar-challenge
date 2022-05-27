import { NestFactory } from '@nestjs/core';
import { RedisMessageTransporterModule } from './redis_message_transporter.module';

import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    RedisMessageTransporterModule,
    {
      transport: Transport.REDIS, //setting transporter
      options: {
        url: 'redis://localhost:6379',
      },
    },
  );
  await app.listen();
}
bootstrap();
