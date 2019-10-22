const i18n = require('../../locales');
const queues = require('../../jobs/queues');

module.exports = async function depsInjectionMiddleware(ctx, next) {
  ctx.t = i18n.t.bind(i18n);
  ctx.queues = queues;
  await next();
};
