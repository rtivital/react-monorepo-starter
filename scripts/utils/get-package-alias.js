const getSrcMap = require('./get-src-map');

module.exports = function getPackageAlias(packageName) {
  const packagesData = getSrcMap();
  delete packagesData[packageName];
  return packagesData;
};
