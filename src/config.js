const { version: VERSION } = require('../package.json');

const {
  GIT_DESCRIBE,
  NODE_ENV = 'development',
  NOTIFY_WATCHER_TOKEN = 'secret',
  PORT = 3003,
  REDIS_DB = 0,
  REDIS_HOST = 'localhost',
  REDIS_PASSWORD,
  REDIS_PORT = 6379,
  SERVER_API_URL = 'localhost:3000',
  TELEGRAM_BOT_TOKEN,
} = process.env;

const isDev = NODE_ENV === 'development';
const isProd = NODE_ENV === 'production';
const isTest = NODE_ENV === 'test';

module.exports = {
  GIT_DESCRIBE,
  VERSION,
  server: {
    url: SERVER_API_URL,
  },
  api: {
    port: PORT,
    authToken: {
      headerName: 'x-notify-watcher-token',
      headerValue: NOTIFY_WATCHER_TOKEN,
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
