const constants = require('../constants');

const { unicodeEmojis } = constants;

module.exports = {
  translation: {
    auth: {
      welcome: `${unicodeEmojis.wave} Hello! NotifyWatcherBot welcomes you!\n\nFirst of all, I will need your email so I may remember your settings from now on.`,
      writeAnEmail: `${unicodeEmojis.noEntry} Please send me a valid email to remember your settings.`,
      sendingEmail: `${unicodeEmojis.envelope} We will be sending an email to {{text}} briefly. Once received, please send me the verification code that comes in that email.`,
      otpVerified: `${unicodeEmojis.checkMark} Your code seems to be ok.`,
      errors: {
        registeringEmail: `${unicodeEmojis.noEntry} Whops! There was an unfortunate error while sending the email. Please try again later...`,
        otpFailed: `${unicodeEmojis.noEntry} Whops! It seems your code is not ok. Please check if the code you submitted is the one we sent to {{email}}`,
      },
    },
    chooseService: {
      chooseOne: 'Please select the watcher you would like to subscribe to.',
      chooseAValidOne: `Please select a valid option from the services list.\n\nYou can also press the "Cancel" button, or write /cancel to quit this menu.`,
    },
  },
};
