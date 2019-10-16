const Scene = require('telegraf/scenes/base');
const constants = require('../constants');

const { sceneNames, cancel } = constants;

const scene = new Scene(sceneNames.chooseService);

scene.enter(async ctx => {
  const services = await ctx.apiCalls.getServices();
  const inlineKeyboard = services
    .map(({ id, name }) => [
      {
        text: name,
        callback_data: id,
      },
    ])
    .concat([[{ text: 'Cancel', callback_data: cancel }]]);

  ctx.reply('Please select the watcher you would like to subscribe to', {
    reply_markup: {
      inline_keyboard: inlineKeyboard,
      one_time_keyboard: true,
    },
  });
});

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

scene.on('message', ctx =>
  ctx.reply(
    `Please select a valid option from the services list.\n\nYou can also press the "Cancel" button, or write /cancel to quit this menu.`,
  ),
);

module.exports = scene;
