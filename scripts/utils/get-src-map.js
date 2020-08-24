const path = require('path');
const getPackagesData = require('./get-packages-data');

module.exports = function getSrcMap() {
  const packagesData = getPackagesData();

  return Object.keys(packagesData).reduce((acc, name) => {
    acc[name] = path.join(packagesData[name], './src');
    return acc;
  }, {});
};
