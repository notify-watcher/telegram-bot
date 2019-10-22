const {
  NODE_ENV = 'development',
  NOTIFY_WATCHER_TOKEN,
  PORT,
  REDIS_DB,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  TELEGRAM_BOT_TOKEN,
} = process.env;

const isDev = NODE_ENV === 'development';
const isProd = NODE_ENV === 'production';
const isTest = NODE_ENV === 'test';

module.exports = {
  api: {
    port: PORT || 3000,
    authToken: {
      headerName: 'x-notify-watcher-token',
      headerValue: NOTIFY_WATCHER_TOKEN || 'secret',
    },
  },
  env: { isDev, isProd, isTest },
  jobs: {
    concurrencies: {
      messages: 5,
    },
  },
  redis: {
    host: REDIS_HOST || 'localhost',
    port: REDIS_PORT || 6379,
    db: REDIS_DB || 0,
    password: REDIS_PASSWORD,
  },
  token: TELEGRAM_BOT_TOKEN,
};
