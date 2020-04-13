/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const webpack = require('webpack');

const mainConfig = require('./webpack.config')('development');

module.exports = {
  ...mainConfig,

  mode: 'development',

  output: {
    path: path.resolve(__dirname, '../dist/'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  module: {
    rules: mainConfig.module.rules.concat([
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ]),
  },

  plugins: mainConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
  ]),

  devServer: {
    port: 4000,
    hot: true,
    stats: {
      children: false,
    },
    historyApiFallback: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    public: 'dev.webnsurf.com',
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },

  devtool: 'source-map',
};
