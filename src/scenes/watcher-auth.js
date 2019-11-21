const Scene = require('telegraf/scenes/base');
const _ = require('lodash');
const constants = require('../constants');

const { sceneNames } = constants;

const scene = new Scene(sceneNames.watcherAuth);

function getRequiredKeys(ctx) {
  return Object.keys(ctx.session.currentWatcherCache.authData);
}

function handleEnter(ctx) {
  const requiredAuths = getRequiredKeys(ctx);
  const introductionType = requiredAuths.length > 1 ? 'Plural' : 'Singular';

  ctx.reply(
    ctx.t(`watcherAuth.introduction${introductionType}`, {
      requiredAuths: requiredAuths.join(', '),
    }),
  );
}

function handleLeave(ctx) {
  ctx.session.currentWatcherCache = undefined;
  ctx.scene.enter(sceneNames.chooseNotifications);
}

scene.enter(handleEnter);
scene.command('goBack', handleLeave);

scene.on('message', async ctx => {
  const { apiCalls, t, update } = ctx;
  const { text } = update.message;

  if (['/start', '/help'].includes(text)) return;

  const splitText = text.split(':');

  if (splitText.length !== 2) {
    ctx.reply(t('watcherAuth.invalidFormat'));
    return;
  }

  const [key, value] = splitText;

  const requiredKeys = getRequiredKeys(ctx);
  if (!requiredKeys.includes(key)) {
    ctx.reply(t('watcherAuth.invalidKey'));
    return;
  }

  ctx.session.currentWatcherCache.submittedAuth = {
    ...ctx.session.currentWatcherCache.submittedAuth,
    [key]: _.trim(value),
  };

  ctx.deleteMessage(ctx.update.message.message_id);

  const missingKeys = _.difference(
    requiredKeys,
    Object.keys(ctx.session.currentWatcherCache.submittedAuth),
  );

  if (missingKeys.length > 0) {
    ctx.reply(
      t('watcherAuth.missingKeys', {
        addedKey: key,
        missingKeys: missingKeys.join(', '),
      }),
    );
    return;
  }

  const {
    me,
    currentWatcherCache: { currentWatcher, submittedAuth, subscriptionsCache },
  } = ctx.session;
  // TODO: handle failed case
  await apiCalls.subscribe(
    me.email,
    currentWatcher,
    subscriptionsCache,
    submittedAuth,
  );
  ctx.reply(t('watcherAuth.finished'));
  handleLeave(ctx);
});

module.exports = scene;
