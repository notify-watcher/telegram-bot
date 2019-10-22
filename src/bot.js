const Telegraf = require('telegraf');
const RedisSession = require('telegraf-session-redis');
const apiCalls = require('./api-calls');
const config = require('./config');
const constants = require('./constants');
const i18n = require('./locales');
const { loggerMiddleware, scenesMiddleware } = require('./middleware');

const { sceneNames } = constants;

const session = new RedisSession(config.redis);

const bot = new Telegraf(config.token);
bot.context = { apiCalls, t: i18n.t.bind(i18n) };

bot.use(loggerMiddleware);
bot.use(session);
bot.use(scenesMiddleware);

bot.start(ctx => {
  ctx.scene.enter(sceneNames.auth);
});

bot.help(ctx => ctx.reply('Help'));

bot.command('list', ctx => {
  ctx.scene.enter(sceneNames.chooseService);
});

module.exports = bot;
