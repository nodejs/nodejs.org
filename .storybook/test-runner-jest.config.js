const { resolve } = require('node:path');
const { getJestConfig } = require('@storybook/test-runner');

/** @type {import('@jest/types').Config.InitialOptions} */
const defaultConfiguration = getJestConfig();

// We override the default snapshot serializer with our custom HTML serializer
// so that we never serialize class names as they're irrelevant for our snapshots
defaultConfiguration.snapshotSerializers = [
  resolve(__dirname, 'test-runner-html-snapshot.js'),
];

// We use CommonJS as Jest in general is happier with CommonJS
module.exports = defaultConfiguration;
