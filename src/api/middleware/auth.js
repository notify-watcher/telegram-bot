const createError = require('http-errors');
const config = require('../../config');

const { headerName, headerValue } = config.api.serverToken;

module.exports = function authMiddleware(ctx, next) {
  const token = ctx.headers[headerName];
  if (!token || token !== headerValue) {
    ctx.throw(createError.Unauthorized());
  }

  return next();
};
