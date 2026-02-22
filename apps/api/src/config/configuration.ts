export default () => ({
  port: parseInt(process.env.PORT!, 10) || 4000,
  database: {
    url: process.env.DATABASE_URL,
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  rateLimit: {
    ttl: parseInt(process.env.THROTTLE_TTL!, 10) || 60,
    limit: parseInt(process.env.THROTTLE_LIMIT!, 10) || 100,
  },
  environment: process.env.NODE_ENV || 'development',
});
