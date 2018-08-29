const rewireStyledComponents = require('react-app-rewire-styled-components');

/**
 * Allow styled-components displayName for better debugging via react-app-rewire
 * - https://www.styled-components.com/docs/tooling#better-debugging
 * - https://github.com/timarney/react-app-rewired
 * - https://github.com/withspectrum/react-app-rewire-styled-components
 * */
module.exports = function override(config, env) {
  config = rewireStyledComponents(config, env, { displayName: true });
  return config;
};