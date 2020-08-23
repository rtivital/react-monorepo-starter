const path = require('path');

module.exports = function getBasePaths(basePath) {
  return {
    entry: path.join(basePath, './src/index'),
    output: path.join(basePath, './dist'),
  };
};
