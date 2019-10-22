const keymirror = require('keymirror');

const sceneNames = keymirror({
  auth: null,
  chooseService: null,
});

const queueNames = keymirror({
  messages: null,
});

const unicodeEmojis = {
  checkMark: '\u{2705}',
  envelope: '\u{2709}',
  noEntry: '\u{1F6AB}',
  wave: '\u{1F44B}',
};

module.exports = {
  cancel: 'CANCEL',
  queueNames,
  sceneNames,
  unicodeEmojis,
};
