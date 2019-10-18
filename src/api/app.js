const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const {
  authMiddleware,
  errorsMiddleware,
  depsInjectionMiddleware,
} = require('./middleware');
const router = require('./router');
const config = require('../config');

const app = new Koa();

if (config.env.isProd || config.env.isDev) app.use(logger());

app
  .use(authMiddleware)
  .use(depsInjectionMiddleware)
  .use(errorsMiddleware)
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;
