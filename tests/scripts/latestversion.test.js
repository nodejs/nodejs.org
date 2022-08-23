'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const latestversion = require('../../scripts/helpers/latestversion');

test('latestversion.current()', async (t) => {
  await t.test('should be equal/greater than v5.0.0', () => {
    const currentVersion = latestversion.current([
      { version: 'v4.2.1', lts: true },
      { version: 'v0.12.7', lts: false }
    ]);

    assert.equal(currentVersion, undefined);
  });

  await t.test('should not be an LTS release', () => {
    const currentVersion = latestversion.current([
      { version: 'v5.0.0', lts: false },
      { version: 'v4.2.1', lts: true },
      { version: 'v0.12.7', lts: false }
    ]);

    assert.equal(currentVersion.node, 'v5.0.0');
  });

  await t.test('should generate major version string', () => {
    const currentVersion = latestversion.current([
      { version: 'v7.0.0', lts: false }
    ]);

    assert.equal(currentVersion.nodeMajor, 'v7.x');
  });
});

test('latestversion.lts()', async (t) => {
  await t.test('should be an LTS release', () => {
    const ltsVersion = latestversion.lts([
      { version: 'v4.2.1', lts: true },
      { version: 'v0.12.7', lts: false }
    ]);

    assert.equal(ltsVersion.node, 'v4.2.1');
  });

  await t.test('should pick latest LTS release', () => {
    const ltsVersion = latestversion.lts([
      { version: 'v5.0.0', lts: false },
      { version: 'v4.2.1', lts: true },
      { version: 'v4.2.0', lts: true },
      { version: 'v0.12.7', lts: false }
    ]);

    assert.equal(ltsVersion.node, 'v4.2.1');
  });
});
