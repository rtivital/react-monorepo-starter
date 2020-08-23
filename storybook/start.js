const path = require('path');
const storybook = require('@storybook/react/standalone');
const getPort = require('get-port');

getPort({ port: getPort.makeRange(8000, 8100) }).then(port => {
  storybook({
    port,
    mode: 'dev',
    configDir: path.join(__dirname, './'),
  });
});
