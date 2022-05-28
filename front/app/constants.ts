/* eslint-disable import/no-anonymous-default-export */

// Environment Variables for client side, generated on build step,
// next.config.js env variables
export default {
  baseApiUrl: process.env.BASE_API_URL,
  api: {
    truck: process.env.BASE_API_URL + '/truck',
    event: process.env.BASE_API_URL + '/events',
  },
};
