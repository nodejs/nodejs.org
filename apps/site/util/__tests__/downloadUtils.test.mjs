import {
  parseCompat,
  nextItem,
  OPERATING_SYSTEMS,
  INSTALL_METHODS,
  PACKAGE_MANAGERS,
  PLATFORMS,
} from '@/util/downloadUtils';

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
          expect(Array.isArray(result)).toBe(true);
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
        expect(result.length).toBe(1);
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
      expect(result[0].disabled).toBe(true);
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
      expect(result[0].disabled).toBe(true);
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
      expect(result[0].disabled).toBe(true);
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
      expect(result[0].disabled).toBe(true);
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
      expect(result[0].disabled).toBe(true);
    });
  });
});

describe('nextItem', () => {
  it('should find the first valid item if current is invalid', () => {
    const items = [
      { value: 'invalid', disabled: true },
      { value: 'valid', disabled: false },
    ];
    expect(nextItem('invalid', items)).toBe('valid');
    expect(nextItem('valid', items)).toBe('valid');
  });
});
