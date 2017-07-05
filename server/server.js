// const Webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
const createBackend = require('./backend');

const backendHost = 'localhost';
const backendPort = '5001';
// TODO set host and port as environment variables
module.exports = function createServer(host, port) {

  // const compiler = Webpack(webpackConfig);
  // const server = new WebpackDevServer(compiler, {
  //   // stats: {
  //   //   colors: true
  //   // }
  //   proxy: {
  //     '/api/*': {
  //       // TODO get host and port as parameters?
  //       target: 'http://' + backendHost + ':' + backendPort
  //     }
  //   },
  //   contentBase: './public',
  //   hot: true
  // });

  server.listen(port, host, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log('Local web server runs at http://' + host + ':' + port);
  });
  createBackend(backendHost, backendPort);
}
