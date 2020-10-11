const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@csiber/audible': path.resolve('./projects/audible/src'),
      }
    },
  }
}
