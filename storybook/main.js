const path = require('path');
const chalk = require('chalk');
const { argv } = require('yargs');
const loaders = require('../webpack/loaders');
const getPackagePath = require('../scripts/utils/get-package-path');

const DEFAULT_STORIES = ['../src/**/*.story.@(jsx|mdx)'];
const packages = argv._;
let stories = DEFAULT_STORIES;

if (packages.length !== 0) {
  stories = [];

  packages.forEach(packageName => {
    const packagePath = getPackagePath(packageName);
    if (packagePath) {
      stories.push(path.join(packagePath, 'src/**/*.story.@(jsx|mdx)'));
    } else {
      process.stdout.write(chalk.yellow(`Unable to resolve ${packageName}`));
    }
  });
}

if (stories.length === 0) {
  stories = DEFAULT_STORIES;
}

module.exports = {
  stories,
  webpackFinal: (config, { configType }) => {
    config.module.rules.push(loaders.less({ publicPath: '/', mode: configType.toLowerCase() }));
    return config;
  },
};
