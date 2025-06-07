import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getNodeDownloadUrl } from '#site/util/getNodeDownloadUrl';

const version = 'v18.16.0';

describe('getNodeDownloadUrl', () => {
  it('should return the correct download URL for Mac', () => {
    const os = 'MAC';
    const platform = 86;
    const expectedUrl = 'https://nodejs.org/dist/v18.16.0/node-v18.16.0.pkg';

    assert.equal(getNodeDownloadUrl({ version, os, platform }), expectedUrl);
  });

  it('should return the correct download URL for Windows (32-bit)', () => {
    const os = 'WIN';
    const platform = 86;
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-x86.msi';

    assert.equal(getNodeDownloadUrl({ version, os, platform }), expectedUrl);
  });

  it('should return the correct download URL for Windows (64-bit)', () => {
    const os = 'WIN';
    const platform = 64;
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi';

    assert.equal(getNodeDownloadUrl({ version, os, platform }), expectedUrl);
  });

  it('should return the default download URL for other operating systems', () => {
    const os = 'OTHER';
    const platform = 86;
    const expectedUrl = 'https://nodejs.org/dist/v18.16.0/node-v18.16.0.tar.gz';

    assert.equal(getNodeDownloadUrl({ version, os, platform }), expectedUrl);
  });

  describe('MAC', () => {
    it('should return .pkg link for installer', () => {
      const url = getNodeDownloadUrl({
        version: 'v18.0.0',
        os: 'MAC',
        platform: 'x64',
        kind: 'installer',
      });
      assert.ok(url.includes('.pkg'));
    });
  });

  describe('WIN', () => {
    it('should return an MSI link for installer', () => {
      const url = getNodeDownloadUrl({
        version: 'v18.0.0',
        os: 'WIN',
        platform: 'x64',
        kind: 'installer',
      });
      assert.ok(url.includes('.msi'));
    });
  });
});
