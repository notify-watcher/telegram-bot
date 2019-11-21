const Stage = require('telegraf/stage');
const auth = require('../scenes/auth');
const chooseNotificationsScene = require('../scenes/choose-notifications');
const watcherAuth = require('../scenes/watcher-auth');

const stage = new Stage();
[auth, chooseNotificationsScene, watcherAuth].forEach(scene =>
  stage.register(scene),
);

module.exports = stage.middleware();
