const keymirror = require('keymirror');

const sceneNames = keymirror({
  auth: null,
  chooseNotifications: null,
});

const queueNames = keymirror({
  messages: null,
});

const unicodeEmojis = {
  checkMark: '\u{2705}',
  envelope: '\u{2709}',
  noEntry: '\u{1F6AB}',
  square: '\u{1F532}',
  wave: '\u{1F44B}',
};

module.exports = {
  BACK: 'BACK',
  CANCEL: 'CANCEL',
  queueNames,
  SAVE: 'SAVE',
  sceneNames,
  unicodeEmojis,
};
