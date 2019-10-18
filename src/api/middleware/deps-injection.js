const i18n = require('../../locales');

module.exports = async function depsInjectionMiddleware(ctx, next) {
  ctx.t = i18n.t.bind(i18n);
  await next();
};
