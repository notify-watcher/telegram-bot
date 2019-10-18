const env = require('../../config').env;

function logError(err) {
  // TODO: config rollbar, or something like that
  if (env.isProd || env.isDev) console.error(err); // eslint-disable-line no-console
}

module.exports = async function errorsMiddleware(ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    if (ctx.status === 500) logError(err);
    ctx.body = {
      message:
        ctx.status !== 500 && err.message
          ? err.message
          : ctx.t('errors.default'),
    };
  }
};
