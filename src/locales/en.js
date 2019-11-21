const constants = require('../constants');

const { unicodeEmojis } = constants;

const authDataFormatExample =
  'For example, if I am asking you for your token, you should send it to me in the following format: \n\ntoken: your-token.\n\nPlease send me one credential at a time.';

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
    watcherAuth: {
      introductionSingular: `It looks like this watcher requires a {{requiredAuths}}. ${authDataFormatExample}\n\nFinally, if you wish to exit this screen, simply type /goBack.`,
      introductionPlural: `It looks like this watcher requires {{requiredAuths}}. ${authDataFormatExample}\n\nFinally, if you wish to exit this screen, simply type /goBack.`,
      invalidFormat: `${unicodeEmojis.noEntry} Your input does not follow the specified format. ${authDataFormatExample}`,
      invalidKey: `${unicodeEmojis.noEntry} The left-most part of your message does not appear to be a valid one.`,
      missingKeys:
        'Ok, {{addedKey}} has been added. Now please send me {{missingKeys}}.',
      finished: `${unicodeEmojis.checkMark} Everything seems to be ok!, Your subscriptions have been updated.`,
    },
    errors: {
      default: 'Server error',
    },
  },
};
