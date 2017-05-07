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
      },
      {
        test: /(\.jsx|\.js)$/,
        exclude: /(node_modules|index.js)/,
        include: 'test',
        loader: 'istanbul-instrumenter-loader',
        enforce: 'post'
      }
    ]
  },
  resolve: {
    modules: ['src', 'node_modules', 'test'],
    extensions: ['.js', '.jsx']
  },
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true
  },
  plugins: plugins
};

createServer(config, host, port);

module.exports = config;
