const path = require('path');
const getAppConfig = require('../../../webpack/get-app-config');

module.exports = getAppConfig({
  base: path.join(__dirname, './'),
  mode: process.env.NODE_ENV || 'production',
});
