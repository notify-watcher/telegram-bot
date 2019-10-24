const path = require('path');
const { messagesQueue } = require('./queues');
const { concurrencies } = require('../config').jobs;

messagesQueue.process(
  concurrencies.messages,
  path.join(__dirname, 'processors', 'messages.js'),
);
