const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const babelrc = require('./.babelrc');

const babel = () => ({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  include: path.join(__dirname, '../src'),
  use: {
    loader: 'babel-loader',
    options: babelrc,
  },
});

const hot = () => ({
  test: /\.(js|jsx)$/,
  use: 'react-hot-loader/webpack',
  include: /node_modules/,
});

const file = () => ({
  test: /\.(svg|png|jpg|gif|woff|woff2|otf|ttf|eot)$/,
  loader: 'file-loader',
});

const less = settings => ({
  test: /\.(less|css)$/,
  use: [
    settings.mode === 'production'
      ? {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: settings.publicPath,
        },
      }
      : 'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName:
            settings.mode === 'production'
              ? '[hash:base64:10]'
              : '[path][name]__[local]--[hash:base64:5]',
        },
      },
    },
    {
      loader: 'less-loader',
      options: {
        prependData: "@import 'open-color/open-color.less';",
      },
    },
    ...(settings.mode === 'production'
      ? [{ loader: 'postcss-loader', options: { plugins: () => [autoprefixer] } }]
      : []),
  ],
});

module.exports = {
  babel,
  hot,
  file,
  less,
};
