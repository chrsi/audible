const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    app: './index.js',
  },
  output: {
    filename: 'audible.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
