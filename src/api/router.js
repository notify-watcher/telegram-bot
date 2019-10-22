const Router = require('koa-router');

const router = new Router();

router.post('/notifications', ctx => {
  const { body } = ctx.request;
  const telegramChatIds = Object.keys(body);
  telegramChatIds.forEach(chatId => {
    body[chatId].forEach(notification =>
      ctx.queues.messagesQueue.add({ chatId, notification }),
    );
  });
  ctx.status = 204;
});

module.exports = router;
