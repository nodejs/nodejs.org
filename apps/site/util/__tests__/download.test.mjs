import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  parseCompat,
  nextItem,
  OPERATING_SYSTEMS,
  INSTALL_METHODS,
  PACKAGE_MANAGERS,
  PLATFORMS,
  getNodeDownloadUrl,
} from '#site/util/download';

const version = 'v18.16.0';

describe('parseCompat', () => {
  it('should handle all OS, install methods, and package managers', () => {
    OPERATING_SYSTEMS.forEach(os => {
      INSTALL_METHODS.forEach(method => {
        PACKAGE_MANAGERS.forEach(pm => {
          const releaseContext = {
            os: os.value,
            installMethod: method.value,
            platform: 'x64',
            version: 'v16.0.0',
            release: { status: 'LTS' },
          };
          const result = parseCompat([os, pm, method], releaseContext);
          assert.ok(Array.isArray(result));
        });
      });
    });
  });

  it('should validate platform compatibility', () => {
    OPERATING_SYSTEMS.forEach(os => {
      const platforms = PLATFORMS[os.value] || [];
      platforms.forEach(platform => {
        const releaseContext = {
          os: os.value,
          installMethod: '',
          platform: platform.value,
          version: 'v16.0.0',
          release: { status: 'LTS' },
        };
        const result = parseCompat([platform], releaseContext);
        assert.equal(result.length, 1);
      });
    });
  });

  describe('extended tests', () => {
    it('should disable items if OS is not supported', () => {
      const items = [
        {
          value: 'testItem',
          compatibility: { os: ['MAC'] },
        },
      ];
      const result = parseCompat(items, {
        os: 'WIN',
        installMethod: '',
        platform: '',
        version: 'v16.0.0',
        release: { status: 'LTS' },
      });
      assert.ok(result[0].disabled);
    });

    it('should disable items if installMethod is not supported', () => {
      const items = [
        {
          value: 'testItem',
          compatibility: { installMethod: ['NVM'] },
        },
      ];
      const result = parseCompat(items, {
        os: 'MAC',
        installMethod: 'FNM',
        platform: '',
        version: 'v16.0.0',
        release: { status: 'Current' },
      });
      assert.ok(result[0].disabled);
    });

    it('should disable items if platform is not supported', () => {
      const items = [
        {
          value: 'testItem',
          compatibility: { platform: ['arm64'] },
        },
      ];
      const result = parseCompat(items, {
        os: 'LINUX',
        installMethod: '',
        platform: 'x64',
        version: 'v16.0.0',
        release: { status: 'LTS' },
      });
      assert.ok(result[0].disabled);
    });

    it('should disable items if semver constraint is not satisfied', () => {
      const items = [
        {
          value: 'testItem',
          compatibility: { semver: ['>= 16.9.0'] },
        },
      ];
      const result = parseCompat(items, {
        os: 'MAC',
        installMethod: '',
        platform: 'x64',
        version: 'v16.0.0',
        release: { status: 'LTS' },
      });
      assert.ok(result[0].disabled);
    });

    it('should disable items if release status is not supported', () => {
      const items = [
        {
          value: 'testItem',
          compatibility: { releases: ['Current'] },
        },
      ];
      const result = parseCompat(items, {
        os: 'WIN',
        installMethod: '',
        platform: 'x64',
        version: 'v18.0.0',
        release: { status: 'LTS' },
      });
      assert.ok(result[0].disabled);
    });
  });
});

describe('nextItem', () => {
  it('should find the first valid item if current is invalid', () => {
    const items = [
      { value: 'invalid', disabled: true },
      { value: 'valid', disabled: false },
    ];
    assert.equal(nextItem('invalid', items), 'valid');
    assert.equal(nextItem('valid', items), 'valid');
  });
});

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
