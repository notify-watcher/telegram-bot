const authMiddleware = require('./auth');
const depsInjectionMiddleware = require('./deps-injection');
const errorsMiddleware = require('./errors');

module.exports = { authMiddleware, depsInjectionMiddleware, errorsMiddleware };
