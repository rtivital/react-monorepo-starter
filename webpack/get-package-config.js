const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const loaders = require('./loaders');
const getPackageAlias = require('../scripts/utils/get-package-alias');

module.exports = function getPackageConfig({ base, publicPath = '/' } = {}) {
  const { name } = fs.readJsonSync(path.join(base, './package.json'));

  return {
    mode: 'production',
    devtool: false,
    entry: path.join(base, './src/index'),

    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },

    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        ...getPackageAlias(name),
      },
    },

    module: {
      rules: [loaders.babel(), loaders.less({ mode: 'production', publicPath }), loaders.file()],
    },

    plugins: [
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      new MiniCssExtractPlugin(),
    ],
  };
};
