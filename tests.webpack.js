var context = require.context('./test', true, /.+-test\.jsx?$/);

require('core-js/es5');

context.keys().forEach(context);
module.exports = context;

// const testsContext = require.context('./test', true, /.+-test\.jsx?$/);
// testsContext.keys().forEach(testsContext);
//
// const componentsContext = require.context('./src', true, /\.js$/);
// componentsContext.keys().forEach(componentsContext);
