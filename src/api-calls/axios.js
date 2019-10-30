const axios = require('axios');
const { server, api } = require('../config');

const { headerName, headerValue } = api.authToken;

const instance = axios.create({
  baseURL: server.url,
  headers: {
    [headerName]: headerValue,
  },
});

module.exports = instance;
