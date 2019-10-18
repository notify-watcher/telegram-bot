/* eslint-disable import/no-extraneous-dependencies */
const { Factory } = require('rosie');

Factory.define('koa-ctx').attrs({
  assert: () =>
    jest.fn((assertion, error) => {
      if (assertion) return;
      throw error;
    }),
  params: () => ({}),
  query: () => ({}),
  redirect: () => jest.fn(),
  request: () => ({}),
  set: () => jest.fn(),
  state: () => ({}),
  t: () => text => text,
  throw: () =>
    jest.fn(err => {
      throw err;
    }),
});

module.exports = Factory;
