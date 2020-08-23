const path = require('path');
const getPackageConfig = require('../../../webpack/get-package-config');

console.log(getPackageConfig({ base: path.join(__dirname, './') }).resolve);

module.exports = getPackageConfig({ base: path.join(__dirname, './') });
