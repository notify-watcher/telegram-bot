const Telegraf = require('telegraf');
const session = require('telegraf/session');
const apiCalls = require('./api-calls');
const config = require('./config');
const constants = require('./constants');
const { loggerMiddleware, scenesMiddleware } = require('./middleware');

const bot = new Telegraf(config.token);
bot.context = { apiCalls };

bot.use(loggerMiddleware);
bot.use(session());
bot.use(scenesMiddleware);

bot.start(ctx =>
  ctx.reply(
    `Welcome to ${ctx.botInfo.username}. You may start exploring your options by writing /help`,
  ),
);

bot.help(ctx => ctx.reply('Help'));

bot.command('list', ctx => {
  ctx.scene.enter(constants.sceneNames.chooseService);
});

module.exports = bot;
