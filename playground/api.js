const { declare } = require('../dist/cjs');

module.exports.api = declare(
  {
    test: {
      worker: (num1) => num1 + 10,
    },
  },
  {
    importKey: 'api',
  }
);