import { strictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { downloadUrlByOS } from '@/util/downloadUrlByOS';

const version = 'v18.16.0';

describe('downloadUrlByOS', () => {
  it('returns the correct download URL for Mac', () => {
    const os = 'MAC';
    const bitness = 86;
    const expectedUrl = 'https://nodejs.org/dist/v18.16.0/node-v18.16.0.pkg';

    strictEqual(downloadUrlByOS(version, os, bitness), expectedUrl);
  });

  it('returns the correct download URL for Windows (32-bit)', () => {
    const os = 'WIN';
    const bitness = 86;
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-x86.msi';

    strictEqual(downloadUrlByOS(version, os, bitness), expectedUrl);
  });

  it('returns the correct download URL for Windows (64-bit)', () => {
    const os = 'WIN';
    const bitness = 64;
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi';

    strictEqual(downloadUrlByOS(version, os, bitness), expectedUrl);
  });

  it('returns the default download URL for other operating systems', () => {
    const os = 'OTHER';
    const bitness = 86;
    const expectedUrl = 'https://nodejs.org/dist/v18.16.0/node-v18.16.0.tar.xz';

    strictEqual(downloadUrlByOS(version, os, bitness), expectedUrl);
  });
});
