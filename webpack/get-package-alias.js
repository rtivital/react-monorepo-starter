const path = require('path');
const fs = require('fs-extra');
const glob = require('fast-glob');

const { workspaces } = fs.readJsonSync(path.join(__dirname, '../package.json'));
const packages = glob.sync(
  workspaces.map(workspace => path.join(__dirname, `../${workspace}/package.json`))
);

module.exports = function getPackageAlias(packageName) {
  return packages.reduce((acc, item) => {
    const packageRoot = item.replace('/package.json', '');
    const { name } = fs.readJsonSync(path.join(packageRoot, 'package.json'));

    if (name !== packageName) {
      acc[name] = path.join(packageRoot, './src');
    }

    return acc;
  }, {});
};
