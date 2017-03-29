var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV || 'dev';
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');

var appName = 'app';
var host = '0.0.0.0';
var port = '5000';

var plugins = [], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({minimize: true}));
  outputFile = appName + '.min.js';
} else {
  outputFile = appName + '.js';
}
// plugins.push(new webpack.SourceMapDevToolPlugin({
//   test: /(\.jsx|\.js)$/
// }));

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
        // include: path.resolve('./test'),
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

if (env === 'dev') {
  new WebpackDevServer(webpack(config), {
    contentBase: './public',
    hot: true
    // debug: true
  }).listen(port, host, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
  console.log('-------------------------');
  console.log('Local web server runs at http://' + host + ':' + port);
  console.log('-------------------------');
}

module.exports = config;
