const path = require('path');
const webpack = require('webpack');

const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@web': path.resolve(__dirname, 'src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [new Dotenv()],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    index: 'index.html',
    compress: true,
    port: 8080,
    hot: true,
  },
};
