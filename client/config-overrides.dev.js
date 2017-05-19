const path = require('path');

module.exports = function(config) {
  // Ignore LESS files in the "catchall" loader
  config.module.loaders[0].exclude.push(/\.less$/);

  // Add the LESS loader
  config.module.loaders.push({
    test: /\.less$/,
    loader: 'style!css?importLoaders=1!postcss!less'
  });

  // Allow importing anything under 'src' as if it were a module.
  // So you can "import Icon from 'components/Icon'" instead of
  // "import Icon from '../components/Icon'"
  config.resolve.fallback = [...config.resolve.fallback, path.resolve('src')];

  return config;
}