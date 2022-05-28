/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  env: {
    BASE_API_URL: 'http://localhost:3001',
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
