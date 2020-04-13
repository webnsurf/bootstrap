/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const mainConfig = require('./webpack.config')('production');

module.exports = {
  ...mainConfig,

  mode: 'production',

  output: {
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: '[name].[contenthash].js',
    filename: '[name].[contenthash].js',
  },

  plugins: mainConfig.plugins.concat([
    new CopyWebpackPlugin([
      {
        from: 'static',
        to: 'static',
      },
    ]),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
    }),
  ]),
};
