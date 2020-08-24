const getPackagesData = require('./get-packages-data');

module.exports = function getPackagePath(name) {
  return getPackagesData()[name];
};
