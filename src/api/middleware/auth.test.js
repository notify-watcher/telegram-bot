const createError = require('http-errors');
const config = require('../../config');
const Factory = require('../../tests/factories');
const authMiddleware = require('./auth');

const authTokenConfig = config.api.authToken;

describe('authMiddleware', () => {
  describe('when the token is not sent via headers', () => {
    it('throws a 401 error', () => {
      const ctx = Factory.build('koa-ctx', { headers: {} });
      expect(() => authMiddleware(ctx, jest.fn())).toThrow(
        createError.Unauthorized(),
      );
    });
  });

  describe('when the token is sent via headers', () => {
    describe('when the token is not the correct one', () => {
      it('throws a 401 error', () => {
        const ctx = Factory.build('koa-ctx', {
          headers: { [authTokenConfig.headerName]: 'wrong-token' },
        });
        expect(() => authMiddleware(ctx, jest.fn())).toThrow(
          createError.Unauthorized(),
        );
      });
    });

    describe('when the token is the correct one', () => {
      it('does not throw a 401 error', () => {
        const ctx = Factory.build('koa-ctx', {
          headers: {
            [authTokenConfig.headerName]: authTokenConfig.headerValue,
          },
        });
        const next = jest.fn();
        authMiddleware(ctx, next);
        expect(next).toHaveBeenCalled();
      });
    });
  });
});
