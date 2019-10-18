const NODE_ENV = process.env.NODE_ENV || 'development';

const isDev = NODE_ENV === 'development';
const isProd = NODE_ENV === 'production';
const isTest = NODE_ENV === 'test';

module.exports = {
  api: {
    port: process.env.PORT || 3000,
    authToken: {
      headerName: 'x-notify-watcher-token',
      headerValue: process.env.NOTIFY_WATCHER_TOKEN || 'secret',
    },
  },
  env: { isDev, isProd, isTest },
  token: process.env.TELEGRAM_BOT_TOKEN,
  session: {
    store: {
      host: process.env.TELEGRAM_SESSION_HOST || '127.0.0.1',
      port: process.env.TELEGRAM_SESSION_PORT || 6379,
    },
  },
};
