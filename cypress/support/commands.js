import '@testing-library/cypress/add-commands';

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
// Seemed like default options, don't actually work so added 'default' options from docs
// https://github.com/jaredpalmer/cypress-image-snapshot#options
addMatchImageSnapshotCommand({
  failureThreshold: 0.03, // threshold for entire image
  failureThresholdType: 'percent', // percent of image or number of pixels
  customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
  capture: 'viewport', // capture viewport in screenshot
});
