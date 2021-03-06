const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.EnvironmentPlugin([
      'REACT_APP_FIREBASE_KEY',
      'REACT_APP_FIREBASE_DOMAIN',
      'REACT_APP_FIREBASE_PROJECT_ID',
      'REACT_APP_FIREBASE_APP_ID',
      'GITHUB_APP_NAME',
      'BACKEND_API_URL',
      'MIXPANEL_TOKEN',
      'SENTRY_DSN',
      'GITHUB_APP_CLIENT_ID',
      'WEB_URL',
    ]),
    new SentryWebpackPlugin({
      include: './public/',
      configFile: 'sentry.properties',
      release: process.env.SENTRY_RELEASE,
    }),
  ],
});
