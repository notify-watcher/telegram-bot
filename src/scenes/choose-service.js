const Scene = require('telegraf/scenes/base');
const constants = require('../constants');

const { sceneNames, cancel } = constants;

const scene = new Scene(sceneNames.chooseService);

async function handleEnter(ctx) {
  const { data: watchersList } = await ctx.apiCalls.listWatchers();
  const inlineKeyboard = watchersList
    .map(({ displayName, name }) => [
      {
        text: displayName,
        callback_data: name,
      },
    ])
    .concat([[{ text: 'Cancel', callback_data: cancel }]]);

  ctx.reply(ctx.t('chooseService.chooseOne'), {
    reply_markup: {
      inline_keyboard: inlineKeyboard,
      one_time_keyboard: true,
    },
  });
}

scene.enter(handleEnter);
scene.command('start', handleEnter);

scene.command('cancel', ctx => ctx.scene.leave());

scene.on('callback_query', ctx => {
  const { data } = ctx.update.callback_query;
  if (data === cancel) {
    ctx.scene.leave();
  } else {
    // TODO: make a call to the notifications list endpoint, and enter the notifications select scene.
    ctx.reply(`You have subscribed to ${data}`);
  }
});

scene.on('message', ctx => ctx.reply(ctx.t('chooseService.chooseAValidOne')));

module.exports = scene;
