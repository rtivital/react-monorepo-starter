const path = require('path');
const fs = require('fs-extra');
const glob = require('fast-glob');

const REPO_ROOT = path.join(__dirname, '../../');
const CORE_PACKAGE_JSON = fs.readJsonSync(path.join(REPO_ROOT, './package.json'));

module.exports = function getPackagesData() {
  const packages = glob.sync(
    CORE_PACKAGE_JSON.workspaces.map(workspace =>
      path.join(__dirname, `../../${workspace}/package.json`)
    )
  );

  return packages.reduce((acc, item) => {
    const packageRoot = item.replace('/package.json', '');
    const { name } = fs.readJsonSync(path.join(packageRoot, 'package.json'));
    acc[name] = packageRoot;
    return acc;
  }, {});
};
