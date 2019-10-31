const constants = require('../constants');

const { unicodeEmojis } = constants;

module.exports = {
  translation: {
    welcomeBack: 'Welcome back!',
    auth: {
      welcome: `${unicodeEmojis.wave} Hello! NotifyWatcherBot welcomes you!\n\nFirst of all, I will need your email so I may remember your settings from now on.`,
      writeAnEmail: `${unicodeEmojis.noEntry} Please send me a valid email to remember your settings.`,
      sendingEmail: `${unicodeEmojis.envelope} We will be sending an email to {{text}} briefly. Once received, please send me the verification code that comes in that email.`,
      tokenVerified: `${unicodeEmojis.checkMark} Your code is ok.`,
      errors: {
        registeringEmail: `${unicodeEmojis.noEntry} Whops! There was an unfortunate error while sending the email. Please try again later...`,
        tokenFailed: `${unicodeEmojis.noEntry} Whops! It seems your code is not ok. Please check if the code you submitted is the one we sent to {{email}}`,
      },
    },
    chooseNotifications: {
      chooseOneWatcher:
        'Please select the watcher you would like to subscribe to.',
      chooseOneNotification:
        'Please select the specific notification you would like to toggle.',
      chooseAValidOne: `Please select a valid option from the list.`,
    },
    errors: {
      default: 'Server error',
    },
  },
};
