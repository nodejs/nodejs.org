import { OS } from '@/next.constants.mjs';
import { getNodeDownloadUrl } from '@/util/getNodeDownloadUrl';

const version = 'v18.16.0';

describe('getNodeDownloadUrl', () => {
  it('returns the correct download URL for Mac', () => {
    const os = OS.MAC;
    const bitness = 86;
    const expectedUrl = 'https://nodejs.org/dist/v18.16.0/node-v18.16.0.pkg';

    expect(getNodeDownloadUrl(version, os, bitness)).toBe(expectedUrl);
  });

  it('returns the correct download URL for Windows (32-bit)', () => {
    const os = OS.WIN;
    const bitness = 86;
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-x86.msi';

    expect(getNodeDownloadUrl(version, os, bitness)).toBe(expectedUrl);
  });

  it('returns the correct download URL for Windows (64-bit)', () => {
    const os = OS.WIN;
    const bitness = 64;
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi';

    expect(getNodeDownloadUrl(version, os, bitness)).toBe(expectedUrl);
  });

  it('returns the default download URL for other operating systems', () => {
    const os = OS.OTHER;
    const bitness = 86;
    const expectedUrl = 'https://nodejs.org/dist/v18.16.0/node-v18.16.0.tar.gz';

    expect(getNodeDownloadUrl(version, os, bitness)).toBe(expectedUrl);
  });
});
