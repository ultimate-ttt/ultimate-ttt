/// <reference types="cypress" />

const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  if (config.testingType === 'component') {
    require('@cypress/react/plugins/react-scripts')(on, config);
  }

  addMatchImageSnapshotPlugin(on, config);
  return config;
};
