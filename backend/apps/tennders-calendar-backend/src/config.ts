import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mongodb: {
      url: process.env.MONGODB_URL,
    },
    redis: {
      url: process.env.REDIS_URL,
      cacheTimeOut: process.env.REDIS_CACHE_TIME_SECONDS,
    },
  };
});
