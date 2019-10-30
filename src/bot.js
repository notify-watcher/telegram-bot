const Telegraf = require('telegraf');
const RedisSession = require('telegraf-session-redis');
const apiCalls = require('./api-calls');
const config = require('./config');
const constants = require('./constants');
const i18n = require('./locales');
const { loggerMiddleware, scenesMiddleware } = require('./middleware');

const { sceneNames } = constants;

const session = new RedisSession({ store: config.redis });

const bot = new Telegraf(config.token);
bot.context = { apiCalls, t: i18n.t.bind(i18n) };

bot.use(loggerMiddleware);
bot.use(session);
bot.use(scenesMiddleware);

bot.start(ctx => {
  if (ctx.session.loggedIn) {
    ctx.reply(ctx.t('welcomeBack'));
  } else {
    ctx.scene.enter(sceneNames.auth);
  }
});

bot.help(ctx => ctx.reply('Help'));

bot.command('list', ctx => {
  ctx.scene.enter(sceneNames.chooseService);
});

bot.command('chatId', ctx => ctx.reply(ctx.update.message.chat.id));

module.exports = bot;
