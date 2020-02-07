const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 8080,
    compress: true,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [new Dotenv()],
});
