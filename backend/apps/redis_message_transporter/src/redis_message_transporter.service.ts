import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisMessageTransporterService {
  getHello(): string {
    return 'Hello World 2!';
  }
}
