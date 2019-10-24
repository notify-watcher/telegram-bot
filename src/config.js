const {
  NODE_ENV = 'development',
  NOTIFY_WATCHER_SERVER_TOKEN = 'server-token',
  NOTIFY_WATCHER_TELEGRAM_TOKEN = 'telegram-token',
  PORT = 3000,
  REDIS_DB = 0,
  REDIS_HOST = 'localhost',
  REDIS_PASSWORD,
  REDIS_PORT = 6379,
  TELEGRAM_BOT_TOKEN,
} = process.env;

const isDev = NODE_ENV === 'development';
const isProd = NODE_ENV === 'production';
const isTest = NODE_ENV === 'test';

module.exports = {
  api: {
    port: PORT,
    serverToken: {
      headerName: 'x-notify-watcher-server-token',
      headerValue: NOTIFY_WATCHER_SERVER_TOKEN,
    },
    telegramToken: {
      headerName: 'x-notify-watcher-telegram-token',
      headerValue: NOTIFY_WATCHER_TELEGRAM_TOKEN,
    },
  },
  env: { isDev, isProd, isTest },
  jobs: {
    concurrencies: {
      messages: 5,
    },
  },
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    db: REDIS_DB,
    password: REDIS_PASSWORD,
  },
  token: TELEGRAM_BOT_TOKEN,
};
