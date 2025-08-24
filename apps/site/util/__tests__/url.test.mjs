import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getNodeDownloadUrl, getNodeApiUrl } from '../url';

const versionWithPrefix = 'v18.16.0';

describe('getNodeApiUrl', () => {
  it('should return the correct API link for versions >=0.3.1 and <0.5.1', () => {
    const version = '0.4.0';
    const expectedLink = `https://nodejs.org/docs/${version}/api/`;

    const result = getNodeApiUrl(version);

    assert.equal(result, expectedLink);
  });

  it('should return the correct URL for versions >=0.3.1 and <0.5.1', () => {
    const url = getNodeApiUrl('v0.4.10');
    assert.ok(url.includes('/api/'));
  });

  it('should return the correct API link for versions >=0.1.14 and <0.3.1', () => {
    const version = '0.2.0';
    const expectedLink = `https://nodejs.org/docs/${version}/api.html`;

    const result = getNodeApiUrl(version);

    assert.equal(result, expectedLink);
  });

  it('should return the correct API link for versions >=1.0.0 and <4.0.0', () => {
    const version = '2.3.0';
    const expectedLink = `https://iojs.org/dist/${version}/docs/api/`;

    const result = getNodeApiUrl(version);

    assert.equal(result, expectedLink);
  });

  it('should form the correct URL for versions >=1.0.0 and <4.0.0', () => {
    const url = getNodeApiUrl('v1.2.3');
    assert.ok(url.includes('iojs.org/dist/v1.2.3/docs/api/'));
  });

  it('should return the correct API link for other versions', () => {
    const version = '5.0.0';
    const expectedLink = `https://nodejs.org/dist/${version}/docs/api/`;

    const result = getNodeApiUrl(version);

    assert.equal(result, expectedLink);
  });
});

describe('getNodeDownloadUrl', () => {
  it('should return the correct download URL for Mac', () => {
    const os = 'MAC';
    const platform = 86;
    const expectedUrl = 'https://nodejs.org/dist/v18.16.0/node-v18.16.0.pkg';

    assert.equal(
      getNodeDownloadUrl({ versionWithPrefix, os, platform }),
      expectedUrl
    );
  });

  it('should return the correct download URL for Windows (32-bit)', () => {
    const os = 'WIN';
    const platform = 86;
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-x86.msi';

    assert.equal(
      getNodeDownloadUrl({ versionWithPrefix, os, platform }),
      expectedUrl
    );
  });

  it('should return the correct download URL for Windows (64-bit)', () => {
    const os = 'WIN';
    const platform = 64;
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi';

    assert.equal(
      getNodeDownloadUrl({ versionWithPrefix, os, platform }),
      expectedUrl
    );
  });

  it('should return the default download URL for other operating systems', () => {
    const os = 'OTHER';
    const platform = 86;
    const expectedUrl = 'https://nodejs.org/dist/v18.16.0/node-v18.16.0.tar.gz';

    assert.equal(
      getNodeDownloadUrl({ versionWithPrefix, os, platform }),
      expectedUrl
    );
  });

  describe('MAC', () => {
    it('should return .pkg link for installer', () => {
      const url = getNodeDownloadUrl({
        versionWithPrefix: 'v18.0.0',
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
        versionWithPrefix: 'v18.0.0',
        os: 'WIN',
        platform: 'x64',
        kind: 'installer',
      });
      assert.ok(url.includes('.msi'));
    });
  });
});
