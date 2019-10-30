const axios = require('./axios');

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

function listWatchers() {
  return axios.get('/watchers');
}

module.exports = {
  listWatchers,
  registerEmail,
  verifyToken,
};
