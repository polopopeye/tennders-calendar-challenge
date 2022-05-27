import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mongodb: {
      url: process.env.MONGODB_URL,
    },
  };
});
