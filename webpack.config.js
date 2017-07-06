const path = require('path');

const createBackend = require('./server/backend');
const backendHost = 'localhost';
const backendPort = '5001';

module.exports = {
  devtool: 'source-map',
  entry: {
    'app': [
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/index'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'url-loader?limit=100000@name=[name][ext]'
      }]
  },
  devServer: {
    proxy: {
      '/api/*': {
        // TODO get host and port as parameters?
        target: 'http://' + backendHost + ':' + backendPort
      }
    }
  }
};

createBackend(backendHost, backendPort);
