const Scene = require('telegraf/scenes/base');
const _ = require('lodash');
const constants = require('../constants');

const { BACK, CANCEL, SAVE, sceneNames, unicodeEmojis } = constants;

const scene = new Scene(sceneNames.chooseNotifications);

function resetCache(ctx) {
  ctx.session.notificationTypes = [];
  ctx.session.subscriptionsCache = [];
}

function buildWatchersListMarkup(watchersList) {
  const list = watchersList
    .map(({ displayName, name }) => [
      { text: displayName, callback_data: name },
    ])
    .concat([[{ text: 'Cancel', callback_data: CANCEL }]]);

  return { inline_keyboard: list, one_time_keyboard: true };
}

function buildNotificationsKeyboard(notificationTypes, currentSubscriptions) {
  const subscriptionsByType = _.keyBy(currentSubscriptions, 'notificationType');
  const list = Object.values(notificationTypes)
    .map(({ key, description }) => {
      const icon = subscriptionsByType[key]
        ? unicodeEmojis.checkMark
        : unicodeEmojis.square;
      return [{ text: `${icon} ${description}`, callback_data: key }];
    })
    .concat([[{ text: 'Save', callback_data: SAVE }]])
    .concat([[{ text: 'Back', callback_data: BACK }]]);

  return { inline_keyboard: list, one_time_keyboard: true };
}

async function handleListWatchers(ctx) {
  const { data: watchersList } = await ctx.apiCalls.listWatchers();
  ctx.reply(ctx.t('chooseNotifications.chooseOneWatcher'), {
    reply_markup: buildWatchersListMarkup(watchersList),
  });
}

function handleCancel(ctx) {
  resetCache(ctx);
  ctx.scene.leave();
}

scene.enter(handleListWatchers);
scene.command('start', handleListWatchers);
scene.command('cancel', handleCancel);

scene.on('callback_query', async ctx => {
  const { apiCalls } = ctx;
  const { data: selectedOption } = ctx.update.callback_query;

  if (selectedOption === CANCEL) {
    return handleCancel(ctx);
  }

  const goBack = () => {
    resetCache(ctx);
    return handleListWatchers(ctx);
  };

  if (selectedOption === SAVE) {
    const { currentWatcher, me, subscriptionsCache } = ctx.session;
    await apiCalls.subscribe(me.email, currentWatcher, subscriptionsCache);
    return goBack();
  }

  if (selectedOption === BACK) {
    return goBack();
  }

  const replyWithNotificationsList = () => {
    ctx.reply(ctx.t('chooseNotifications.chooseOneNotification'), {
      reply_markup: buildNotificationsKeyboard(
        ctx.session.notificationTypes,
        ctx.session.subscriptionsCache,
      ),
    });
  };

  // We selected a watcher
  if (_.isEmpty(ctx.session.notificationTypes)) {
    const [{ data: me }, { data: watcher }] = await Promise.all([
      apiCalls.me(ctx.session.email),
      apiCalls.listNotifications(selectedOption),
    ]);
    ctx.session.me = me;
    ctx.session.currentWatcher = selectedOption;
    ctx.session.notificationTypes = watcher.notificationTypes;
    ctx.session.subscriptionsCache = (
      _.find(me.subscriptions, { watcher: selectedOption }) || {}
    ).notificationTypes;
    return replyWithNotificationsList();
  }

  const subscribed = !!_.find(ctx.session.subscriptionsCache, {
    notificationType: selectedOption,
  });
  if (subscribed) {
    ctx.session.subscriptionsCache = ctx.session.subscriptionsCache.filter(
      ({ notificationType }) => notificationType !== selectedOption,
    );
  } else {
    const clientId = _.find(ctx.session.me.clients, { kind: 'telegram' })._id;
    ctx.session.subscriptionsCache = (
      ctx.session.subscriptionsCache || []
    ).concat([{ notificationType: selectedOption, clientIds: [clientId] }]);
  }

  return replyWithNotificationsList();
});

scene.on('message', ctx =>
  ctx.reply(ctx.t('chooseNotifications.chooseAValidOne')),
);

module.exports = scene;
