const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { argv } = require('yargs');
const getPackagePath = require('./utils/get-package-path');
const compile = require('./utils/compile');

process.env.NODE_ENV = 'production';

const packages = argv._;

const helpMessage = `npm run build script usage: ${chalk.cyan('npm run build @package/name')}\n`;

function throwError(error) {
  process.stdout.write(`${error}\n`);
  process.stdout.write(helpMessage);
  process.exit(1);
}

if (packages.length === 0) {
  throwError(chalk.red`Packages to build are not defined`);
}

const paths = [];

packages.forEach(item => {
  const packagePath = getPackagePath(item);
  if (!packagePath || !fs.existsSync(path.join(packagePath, 'webpack.config.js'))) {
    process.stdout.write(chalk.yellow(`Warning: cannot locate package: ${item}, skipping`));
  } else {
    paths.push({ path: packagePath, name: item });
  }
});

if (paths.length === 0) {
  throwError(chalk.red`Packages to build cannot be located`);
}

process.stdout.write(`Building packages ${chalk.cyan(paths.map(p => p.name).join(', '))}\n`);

Promise.all(
  paths.map(item => {
    /* eslint-disable-next-line global-require, import/no-dynamic-require */
    const config = require(`${item.path}/webpack.config.js`);

    return compile(config)
      .then(stats => {
        process.stdout.write(
          `${chalk.green`✔`} Package ${chalk.cyan(item.name)} was built in ${chalk.green(
            `${(stats.toJson().time / 1000).toFixed(2).toString()}s`
          )}\n`
        );
      })
      .catch((err, stats) => {
        if (err) {
          process.stdout.write(`${chalk.red`✗`} Package ${chalk.cyan(item.name)} build crashed:\n`);
          process.stdout.write(`${chalk.red(err)}\n`);
        }

        process.stdout.write(`${chalk.red`✗`} Package ${chalk.cyan(item.name)} build crashed:\n`);
        process.stdout.write(`${chalk.red(stats.toString('minimal'))}\n`);
        process.exit(1);
      });
  })
).then(() => {
  process.exit(0);
});
