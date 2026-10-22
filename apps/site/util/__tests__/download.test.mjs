import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  parseCompat,
  nextItem,
  OPERATING_SYSTEMS,
  INSTALL_METHODS,
  PACKAGE_MANAGERS,
  PLATFORMS,
} from '#site/util/download';

import { buildReleaseArtifacts } from '../download/archive';

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

  it('should enable x64 musl only for releases that publish the artifact', () => {
    const platform = PLATFORMS.LINUX.find(({ value }) => value === 'x64-musl');
    assert.ok(
      platform,
      'Linux x64 musl should be available as a manual option'
    );

    const cases = [
      ['v22.23.3', false],
      ['v22.23.2', true],
      ['v23.11.1', true],
      ['v24.20.0', false],
      ['v24.19.0', true],
      ['v25.0.0', true],
      ['v26.8.0', false],
      ['v26.7.0', true],
      ['v27.0.0', true],
    ];

    for (const [version, disabled] of cases) {
      const [result] = parseCompat([platform], {
        os: 'LINUX',
        installMethod: '',
        platform: 'x64-musl',
        version,
        release: { status: 'LTS' },
      });

      assert.equal(result.disabled, disabled, `compatibility for ${version}`);
    }
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

describe('buildReleaseArtifacts', () => {
  it('should list x64 musl only for versions with published artifacts', () => {
    const cases = [
      ['v22.23.3', true],
      ['v22.23.2', false],
      ['v23.11.1', false],
      ['v24.20.0', true],
      ['v24.19.0', false],
      ['v25.0.0', false],
      ['v26.8.0', true],
      ['v26.7.0', false],
      ['v27.0.0', false],
    ];

    for (const [version, shouldInclude] of cases) {
      const { binaries } = buildReleaseArtifacts(
        { minorVersions: [] },
        version
      );
      const artifact = binaries.find(
        ({ fileName }) => fileName === `node-${version}-linux-x64-musl.tar.xz`
      );

      assert.equal(Boolean(artifact), shouldInclude, `artifact for ${version}`);
    }
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

describe('INSTALL_METHODS', () => {
  it('should create icons only when an icon is configured', () => {
    const nvmMethod = INSTALL_METHODS.find(method => method.value === 'NVM');
    const asdfMethod = INSTALL_METHODS.find(method => method.value === 'ASDF');

    assert.ok(nvmMethod?.iconImage);
    assert.equal(asdfMethod?.iconImage, undefined);
  });
});
