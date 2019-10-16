const Stage = require('telegraf/stage');
const chooseServiceScene = require('../scenes/choose-service');

const stage = new Stage();
[chooseServiceScene].forEach(scene => stage.register(scene));

module.exports = stage.middleware();
