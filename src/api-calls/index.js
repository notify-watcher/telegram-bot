const axios = require('./axios');

function registerEmail(email) {
  return axios.post(`/users/${email}/token`);
}

function verifyToken(token, email, chatId) {
  return axios.post(`users/${email}/clients`, {
    token,
    clientData: { kind: 'telegram', chatId },
  });
}

function me(email) {
  return axios.get(`/users/${email}`);
}

function listWatchers() {
  return axios.get('/watchers');
}

function listNotifications(watcherName) {
  return axios.get(`/watchers/${watcherName}`);
}

function subscribe(email, watcher, notificationTypes) {
  return axios.post(`/users/${email}/subscriptions`, {
    watcher,
    notificationTypes,
  });
}

module.exports = {
  listNotifications,
  listWatchers,
  me,
  registerEmail,
  subscribe,
  verifyToken,
};
