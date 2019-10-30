const axios = require('./axios');

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
  return axios.post('/users/send-token', { email });
}

function verifyToken(token, email, chatId) {
  return axios.post('/clients/register', {
    token,
    email,
    clientData: { kind: 'telegram', chatId },
  });
}

module.exports = {
  getServices,
  registerEmail,
  verifyToken,
};
