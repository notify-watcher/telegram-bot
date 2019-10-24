const config = require('./config');

// TODO: Use this header when calling the server api
// eslint-disable-next-line no-unused-vars
const { headerName, headerValue } = config.api.telegram;
// TODO: And to this url
// eslint-disable-next-line no-unused-vars
const { url } = config.api.server;

function getServices() {
  return Promise.resolve([
    {
      id: 'github-id',
      name: 'GitHub',
    },
    {
      id: 'gtd-id',
      name: 'GTD',
    },
    {
      id: 'vtr-id',
      name: 'VTR',
    },
  ]);
}

function registerEmail(email) {
  return Math.random() <= 0.75 ? Promise.resolve(email) : Promise.reject(email);
}

function verifyOTP(otp) {
  return Math.random() <= 0.75 ? Promise.resolve(otp) : Promise.reject(otp);
}

module.exports = {
  getServices,
  registerEmail,
  verifyOTP,
};
