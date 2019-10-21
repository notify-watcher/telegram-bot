const createError = require('http-errors');
const Factory = require('../../tests/factories');
const errorsMiddleware = require('./errors');

const { factoryNames } = Factory;

describe('errorsMiddleware', () => {
  const dummyRequest = {};
  const customErrorMessage = 'custom error message';

  async function expectToHaveErrorMessage(ctx, next, message) {
    await errorsMiddleware(ctx, next);
    expect(ctx.body).toHaveProperty('message', message);
  }

  describe('when no status code is specified', () => {
    const ctx = Factory.build(factoryNames.koaCtx, { request: dummyRequest });
    const error = new Error(customErrorMessage);
    const next = () => {
      throw error;
    };

    it('returns a body with the default error message', () => {
      return expectToHaveErrorMessage(ctx, next, ctx.t('errors.default'));
    });

    it('returns a status 500', () => {
      expect(ctx.status).toBe(500);
    });
  });

  describe('when a status code of 500 is specified', () => {
    const status = 500;
    const ctx = Factory.build(factoryNames.koaCtx, { request: dummyRequest });
    const error = new createError[status](customErrorMessage);
    const next = () => {
      throw error;
    };

    it('returns a body with the default error message', () => {
      return expectToHaveErrorMessage(ctx, next, ctx.t('errors.default'));
    });

    it('returns the status', () => {
      expect(ctx.status).toBe(status);
    });
  });

  describe('when a status code different from 500 is specified', () => {
    const status = 400;
    const ctx = Factory.build(factoryNames.koaCtx);
    const next = () => {
      throw new createError[status](customErrorMessage);
    };

    it('returns a body with the error message', () => {
      return expectToHaveErrorMessage(ctx, next, customErrorMessage);
    });

    it('returns the status', () => {
      expect(ctx.status).toBe(status);
    });
  });
});
