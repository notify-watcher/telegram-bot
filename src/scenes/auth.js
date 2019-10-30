const Scene = require('telegraf/scenes/base');
const validator = require('validator');
const constants = require('../constants');

const { sceneNames } = constants;

const scene = new Scene(sceneNames.auth);

function handleEnter(ctx) {
  ctx.reply(ctx.t('auth.welcome'));
}

scene.enter(handleEnter);
scene.command('start', handleEnter);

scene.on('message', async ctx => {
  const { apiCalls, session, t, update } = ctx;
  const { chat, text } = update.message;

  if (['/start', '/help'].includes(text)) return;

  if (validator.isEmail(text)) {
    await apiCalls
      .registerEmail(text)
      .then(() => {
        ctx.session.email = text;
        ctx.reply(t('auth.sendingEmail', { text }));
      })
      .catch(() => {
        ctx.reply(t('auth.errors.registeringEmail'));
      });
  } else if (session.email) {
    await apiCalls
      .verifyToken(text, session.email, chat.id)
      .then(() => {
        ctx.session.loggedIn = true;
        ctx.reply(t('auth.tokenVerified'));
        ctx.scene.enter(sceneNames.chooseService);
      })
      .catch(() => {
        ctx.reply(t('auth.errors.tokenFailed', { email: session.email }));
      });
  } else {
    ctx.reply(t('auth.writeAnEmail'));
  }
});

module.exports = scene;
