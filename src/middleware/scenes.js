const Stage = require('telegraf/stage');
const auth = require('../scenes/auth');
const chooseServiceScene = require('../scenes/choose-service');

const stage = new Stage();
[auth, chooseServiceScene].forEach(scene => stage.register(scene));

module.exports = stage.middleware();
