// 'use strict'
//
// const WebpackConfig = require('webpack-config')
//
// const TARGET = process.env.npm_lifecycle_event
// var webpackConfig
//
// if (TARGET === 'dev') {
//   webpackConfig = './config/webpack-dev.config.js';
// }
//
// if (TARGET === 'test' || TARGET === 'test-test' || TARGET === 'test-debug') {
//   webpackConfig = './config/webpack-test.config.js';
// }
//
// // Default configuration
// if (TARGET === 'build' || !TARGET) {
//   webpackConfig = './config/webpack-production.config.js';
// }
//
// module.exports = new WebpackConfig().extend(webpackConfig)

const createServer = require('./server/server');

var appName = 'app';
var host = '0.0.0.0';
var port = '5000';

var plugins = [], outputFile;

outputFile = appName + '.js';

var config = {
  entry: './src/index.js',
  devtool: 'eval-source-map',
  // devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    publicPath: __dirname + '/public'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['react', 'es2015']
        }
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'url-loader?limit=100000@name=[name][ext]'
      }
    ]
  },
  resolve: {
    modules: [ 'src', 'node_modules' ],
    extensions: ['.js', '.jsx']
  },
  plugins: plugins
};

createServer(config, host, port);

module.exports = config;
