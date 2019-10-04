/* eslint-disable no-console */
const { format } = require('date-fns');

function header(date, updateId) {
  return `${updateId} - [${format(date, 'PPpp')}]`;
}

function startMessage(ctx, startDate) {
  const {
    updateType,
    updateSubTypes = [],
    update: { update_id: updateId },
  } = ctx;
  console.log(
    `${header(startDate, updateId)} Starting a ${updateType}${
      updateSubTypes ? ` ${updateSubTypes.join(', ')}` : ''
    } update...`,
  );
}

function finishMessage(ctx, startDate) {
  const ms = new Date() - startDate;
  console.log(
    `${header(startDate, ctx.update.update_id)} Response time ${ms}ms`,
  );
}

module.exports = async function loggerMiddleware(ctx, next) {
  const start = new Date();
  startMessage(ctx, start);
  await next(ctx);
  finishMessage(ctx, start);
};
