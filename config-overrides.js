// config-overrides.js
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  config.resolve.fallback = {
    crypto: require.resolve('crypto-browserify'),
    // 其他配置
  };
  return config;
};
