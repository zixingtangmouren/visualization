const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type {import('webpack').Configuration}  */
const config = {
  mode: 'development',
  target: 'web',
  entry: path.resolve(__dirname, './__test__/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './__test__/dist'),
    clean: true,
  },
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [{ loader: 'babel-loader', test: /\.(js|ts)$/ }],
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },
};

module.exports = config;
