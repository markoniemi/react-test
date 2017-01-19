var context = require.context('./test', true, /.+-test\.jsx?$/);

require('core-js/es5');

context.keys().forEach(context);
module.exports = context;
