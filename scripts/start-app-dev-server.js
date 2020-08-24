const fs = require('fs');
const path = require('path');
const { argv } = require('yargs');
const chalk = require('chalk');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const getPackagePath = require('./utils/get-package-path');

const packageName = argv._[0];

if (typeof argv.port === 'number') {
  process.env.PORT = argv.port;
}

const helpMessage = `npm start script usage: ${chalk.cyan('npm start @app/name')}\n`;

function throwError(error) {
  process.stdout.write(`${error}\n`);
  process.stdout.write(helpMessage);
  process.exit(1);
}

function throwParsingError(error) {
  throwError(`${chalk.red`App`} ${packageName} ${chalk.red`cannot be started: ${error}`}`);
}

if (!packageName) {
  throwError(chalk.red`Error: app name was not specified`);
}

const packagePath = getPackagePath(packageName);

if (!packagePath) {
  throwParsingError('app with this name does not exist');
}

if (!fs.existsSync(path.join(packagePath, 'webpack.config.js'))) {
  throwParsingError('it does not have webpack.config.js');
}

(async () => {
  process.env.NODE_ENV = 'development';

  /* eslint-disable-next-line import/no-dynamic-require, global-require */
  const config = await require(`${packagePath}/webpack.config.js`);

  if (!config.devServer) {
    throwParsingError('app does not have dev server configuration in webpack config');
  }

  new WebpackDevServer(webpack(config)).listen(config.devServer.port, 'localhost', error => {
    if (error) {
      /* eslint-disable-next-line no-console */
      console.error(error);
    }
  });
})();
