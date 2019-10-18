const app = require('./app');
const config = require('../config');

const { port } = config.api;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});
