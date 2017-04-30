var webpackConfig = require('./webpack.test.config');
webpackConfig.devtool = 'inline-source-map';

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: true,
    frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],
    files: [
      './node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
      'node_modules/babel-polyfill/dist/polyfill.js',
      'tests.webpack.js'
    ],
    plugins: [
      'karma-chrome-launcher',
      'karma-coverage-istanbul-reporter',
      'karma-junit-reporter',
      'karma-phantomjs-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-reporter',
      'karma-sinon',
      'karma-sinon-chai'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: ['mocha', 'coverage-istanbul', 'junit'],
    coverageIstanbulReporter: {
      reports: ['html', 'lcov'],
      dir: 'reports/coverage',
      file: 'lcov.info',
      fixWebpackSourcePaths: true
    },
    junitReporter: {
      outputDir: 'reports/test',
      useBrowserName: false
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only',
      noInfo: true
    },
    webpackServer: {
      noInfo: true
    },
    autoWatch: true
  });
};
