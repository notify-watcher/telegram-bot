const bot = require('../../bot');

module.exports = function messagesProcessor({
  data: {
    chatId,
    notification: { message },
    watcherName,
  },
}) {
  // TODO: support sending notification.type and notification.metadata
  return bot.telegram.sendMessage(chatId, `${watcherName}: ${message}`);
};
