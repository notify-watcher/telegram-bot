const Scene = require('telegraf/scenes/base');
const validator = require('validator');
const constants = require('../constants');

const { sceneNames } = constants;

const scene = new Scene(sceneNames.auth);

scene.enter(ctx => {
  ctx.reply(ctx.t('auth.welcome'));
});

scene.on('message', async ctx => {
  const { apiCalls, session, t, update } = ctx;
  const { text } = update.message;

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
      .verifyOTP(text)
      .then(() => {
        ctx.reply(t('auth.otpVerified'));
        ctx.scene.enter(sceneNames.chooseService);
      })
      .catch(() => {
        ctx.reply(t('auth.errors.otpFailed', { email: session.email }));
      });
  } else {
    ctx.reply(t('auth.writeAnEmail'));
  }
});

module.exports = scene;
