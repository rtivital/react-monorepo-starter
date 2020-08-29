const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getPort = require('get-port-sync');
const loaders = require('./loaders');
const getPackageAlias = require('../scripts/utils/get-package-alias');
const getBasePaths = require('./get-base-paths');

module.exports = function getPackageConfig({
  base,
  publicPath = '/',
  mode = 'production',
  port: settingsPort,
} = {}) {
  const { name } = fs.readJsonSync(path.join(base, './package.json'));
  const { entry, output } = getBasePaths(base);
  const port = process.env.PORT || settingsPort || getPort();

  return {
    mode,

    devtool: mode === 'production' ? false : 'eval',

    entry:
      mode === 'production'
        ? entry
        : [
          `webpack-dev-server/client?http://localhost:${port}`,
          'webpack/hot/only-dev-server',
          entry,
        ],

    output: {
      path: output,
      filename: '[hash].bundle.js',
      publicPath,
    },

    devServer: {
      port,
      compress: true,
      contentBase: output,
      publicPath,
      stats: { colors: true },
      hot: true,
      historyApiFallback: true,
    },

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
      rules: [loaders.babel(), loaders.hot(), loaders.less({ mode, publicPath }), loaders.file()],
    },

    plugins: [
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(mode || 'development') }),
      new HtmlWebpackPlugin({
        templateContent: ({ htmlWebpackPlugin }) => `
        <!DOCTYPE html>
        <html>
          <head>
            ${htmlWebpackPlugin.tags.headTags}
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Application</title>
          </head>
          <body>
            <noscript>
              Enable JavaScript to use Frontend toolbox
            </noscript>

            <div id="app"></div>
            ${htmlWebpackPlugin.tags.bodyTags}
          </body>
        </html>
      `,
      }),
      ...(mode !== 'production'
        ? [
          new webpack.HotModuleReplacementPlugin(),
          new OpenBrowserPlugin({ url: `http://localhost:${port}` }),
        ]
        : [new MiniCssExtractPlugin()]),
    ],
  };
};
