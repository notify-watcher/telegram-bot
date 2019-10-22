const Queue = require('bull');
const config = require('../config');
const { queueNames } = require('../constants');

const baseQueueOptions = { redis: config.redis };

module.exports = {
  messagesQueue: new Queue(queueNames.messages, baseQueueOptions),
};
