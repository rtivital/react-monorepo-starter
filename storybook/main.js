const loaders = require('../webpack/loaders');

module.exports = {
  stories: ['../src/**/*.story.@(jsx|mdx)'],
  webpackFinal: (config, { configType }) => {
    config.module.rules.push(loaders.less({ publicPath: '/', mode: configType.toLowerCase() }));
    return config;
  },
};
