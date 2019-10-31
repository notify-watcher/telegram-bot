const Stage = require('telegraf/stage');
const auth = require('../scenes/auth');
const chooseNotificationsScene = require('../scenes/choose-notifications');

const stage = new Stage();
[auth, chooseNotificationsScene].forEach(scene => stage.register(scene));

module.exports = stage.middleware();
