import { Injectable } from '@nestjs/common';
import {
  Transport,
  ClientProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    });
  }
  getHello(): string {
    console.log(
      '🚀 ~ file: app.service.ts ~ line 22 ~ AppService ~ getHello ~ this.client',
      this.client,
    );
    return 'Hello World!';
  }
}
