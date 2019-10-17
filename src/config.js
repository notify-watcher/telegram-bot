module.exports = {
  token: process.env.TELEGRAM_BOT_TOKEN,
  session: {
    store: {
      host: process.env.TELEGRAM_SESSION_HOST || '127.0.0.1',
      port: process.env.TELEGRAM_SESSION_PORT || 6379,
    },
  },
};
