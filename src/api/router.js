const Router = require('koa-router');
const config = require('../config');

const router = new Router();

router.get('/', ctx => {
  ctx.body = {
    active: true,
    datetime: new Date(),
    version: `v${config.VERSION}`,
    versionDescribe: config.GIT_DESCRIBE,
  };
});

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
