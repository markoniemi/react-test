process.env.WEBPACK_ENV = 'build';
// TODO need a separate build config, default webpack.config starts webpack dev server
module.exports = require('./webpack.config');
