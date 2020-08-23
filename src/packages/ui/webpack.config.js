const path = require('path');
const getPackageConfig = require('../../../webpack/get-package-config');

module.exports = getPackageConfig({ base: path.join(__dirname, './') });
