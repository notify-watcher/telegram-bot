const bot = require('../../bot');

module.exports = function messagesProcessor({
  data: { chatId, notification },
}) {
  return bot.telegram.sendMessage(chatId, notification);
};
