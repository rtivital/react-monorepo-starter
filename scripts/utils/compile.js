const webpack = require('webpack');

module.exports = function compile(config) {
  const compiler = webpack(config);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err, new Error('Invalid webpack configuration'));
      }

      if (stats.hasErrors()) {
        reject(stats);
      }

      resolve(stats);
    });
  });
};
