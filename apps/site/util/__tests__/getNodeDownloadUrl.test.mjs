import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getNodeDownloadUrl } from '@/util/getNodeDownloadUrl';

const version = 'v18.16.0';

describe('getNodeDownloadUrl', () => {
  it('should return the correct download URL for Mac', () => {
    const os = 'MAC';
    const bitness = 86;
    const expectedUrl = 'https://nodejs.org/dist/v18.16.0/node-v18.16.0.pkg';

    assert.equal(getNodeDownloadUrl(version, os, bitness), expectedUrl);
  });

  it('should return the correct download URL for Windows (32-bit)', () => {
    const os = 'WIN';
    const bitness = 86;
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-x86.msi';

    assert.equal(getNodeDownloadUrl(version, os, bitness), expectedUrl);
  });

  it('should return the correct download URL for Windows (64-bit)', () => {
    const os = 'WIN';
    const bitness = 64;
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi';

    assert.equal(getNodeDownloadUrl(version, os, bitness), expectedUrl);
  });

  it('should return the default download URL for other operating systems', () => {
    const os = 'OTHER';
    const bitness = 86;
    const expectedUrl = 'https://nodejs.org/dist/v18.16.0/node-v18.16.0.tar.gz';

    assert.equal(getNodeDownloadUrl(version, os, bitness), expectedUrl);
  });

  describe('MAC', () => {
    it('should return .pkg link for installer', () => {
      const url = getNodeDownloadUrl('v18.0.0', 'MAC', 'x64', 'installer');
      assert.ok(url.includes('.pkg'));
    });
  });

  describe('WIN', () => {
    it('should return an MSI link for installer', () => {
      const url = getNodeDownloadUrl('v18.0.0', 'WIN', 'x64', 'installer');
      assert.ok(url.includes('.msi'));
    });
  });
});
