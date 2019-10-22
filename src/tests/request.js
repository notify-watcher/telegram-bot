const supertest = require('supertest');
const app = require('../api/app');

const request = supertest(app.callback());

module.exports = request;
