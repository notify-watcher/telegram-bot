const i18n = require('i18next');
const en = require('./en');

i18n.init({
  lng: 'en',
  resources: { en },
});

module.exports = i18n;
