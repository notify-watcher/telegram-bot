const Router = require('koa-router');

const router = new Router();

router.post('/notifications', ctx => {
  const { body } = ctx.request;
  body.forEach(({ chatId, notifications, watcherName }) => {
    notifications.forEach(notification =>
      ctx.queues.messagesQueue.add({ chatId, notification, watcherName }),
    );
  });
  ctx.status = 204;
});

module.exports = router;
