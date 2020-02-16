const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.EnvironmentPlugin([
      'REACT_APP_FIREBASE_KEY',
      'REACT_APP_FIREBASE_DOMAIN',
      'REACT_APP_FIREBASE_PROJECT_ID',
      'REACT_APP_FIREBASE_APP_ID',
      'GITHUB_APP_NAME',
      'BACKEND_API_URL',
      'MIXPANEL_TOKEN',
      'REACT_SENTRY_DSN',
    ]),
  ],
});
