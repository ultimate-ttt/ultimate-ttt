import '@testing-library/cypress/add-commands';

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
// With empty options it didn't work well, so we added 'default' options from the docs: https://github.com/jaredpalmer/cypress-image-snapshot#options
addMatchImageSnapshotCommand({
  failureThreshold: 0.03, // threshold for entire image
  failureThresholdType: 'percent', // percent of image or number of pixels
  customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
  capture: 'viewport',
  // TODO There are Snapshot path difference between open-ct & run. Blocked by this issue: https://github.com/cypress-io/cypress/issues/2319
  customSnapshotsDir: '/cypress/snapshots',
});
