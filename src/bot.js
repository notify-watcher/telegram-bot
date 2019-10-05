const Telegraf = require('telegraf');
const config = require('./config');
const { loggerMiddleware } = require('./middleware');

const bot = new Telegraf(config.token);

bot.use(loggerMiddleware);

bot.start(ctx =>
  ctx.reply(
    `Welcome to ${ctx.botInfo.username}. You may start exploring your options by writing /help`,
  ),
);

bot.help(ctx => ctx.reply('Help'));

module.exports = bot;
