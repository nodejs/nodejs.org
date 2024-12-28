import { getNodeDownloadUrl } from '@/util/getNodeDownloadUrl';

const version = 'v18.16.0';

describe('getNodeDownloadUrl', () => {
  it('returns the correct download URL for Mac', () => {
    const os = 'MAC';
    const platform = 'x64';
    const expectedUrl = 'https://nodejs.org/dist/v18.16.0/node-v18.16.0.pkg';

    expect(getNodeDownloadUrl(version, os, platform)).toBe(expectedUrl);
  });

  it('returns the correct download URL for Windows (32-bit)', () => {
    const os = 'WIN';
    const platform = 'x86';
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-x86.msi';

    expect(getNodeDownloadUrl(version, os, platform)).toBe(expectedUrl);
  });

  it('returns the correct download URL for Windows (64-bit)', () => {
    const os = 'WIN';
    const platform = 'x64';
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi';

    expect(getNodeDownloadUrl(version, os, platform)).toBe(expectedUrl);
  });

  it('returns the correct download URL for Linux (ARMv7)', () => {
    const os = 'LINUX';
    const platform = 'armv7l';
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-linux-armv7l.tar.xz';

    expect(getNodeDownloadUrl(version, os, platform)).toBe(expectedUrl);
  });

  it('returns the correct download URL for Linux (ARMv8)', () => {
    const os = 'LINUX';
    const platform = 'arm64';
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-linux-arm64.tar.xz';

    expect(getNodeDownloadUrl(version, os, platform)).toBe(expectedUrl);
  });

  it('returns the correct download URL for AIX', () => {
    const os = 'AIX';
    const platform = 'ppc64';
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-aix-ppc64.tar.gz';

    expect(getNodeDownloadUrl(version, os, platform)).toBe(expectedUrl);
  });

  it('returns the default download URL for other operating systems', () => {
    const os = 'OTHER';
    const platform = 'x64';
    const expectedUrl = 'https://nodejs.org/dist/v18.16.0/node-v18.16.0.tar.gz';

    expect(getNodeDownloadUrl(version, os, platform)).toBe(expectedUrl);
  });

  it('returns the correct download URL for source code', () => {
    const os = 'OTHER';
    const platform = 'x64';
    const kind = 'source';
    const expectedUrl = 'https://nodejs.org/dist/v18.16.0/node-v18.16.0.tar.gz';

    expect(getNodeDownloadUrl(version, os, platform, kind)).toBe(expectedUrl);
  });

  it('returns the correct download URL for invalid versions', () => {
    const invalidVersion = 'invalid';
    const os = 'OTHER';
    const platform = 'x64';
    const expectedUrl = 'https://nodejs.org/dist/invalid/node-invalid.tar.gz';

    expect(getNodeDownloadUrl(invalidVersion, os, platform)).toBe(expectedUrl);
  });

  it('returns the correct download URL for Mac (ARM64)', () => {
    const os = 'MAC';
    const platform = 'arm64';
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-darwin-arm64.tar.gz';

    expect(getNodeDownloadUrl(version, os, platform)).toBe(expectedUrl);
  });

  it('returns the correct download URL for Windows (ARM64)', () => {
    const os = 'WIN';
    const platform = 'arm64';
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-win-arm64.zip';

    expect(getNodeDownloadUrl(version, os, platform)).toBe(expectedUrl);
  });

  it('returns the correct download URL for Linux (x64)', () => {
    const os = 'LINUX';
    const platform = 'x64';
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-linux-x64.tar.xz';

    expect(getNodeDownloadUrl(version, os, platform)).toBe(expectedUrl);
  });

  it('returns the correct download URL for AIX (default)', () => {
    const os = 'AIX';
    const platform = 'default';
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-aix-ppc64.tar.gz';

    expect(getNodeDownloadUrl(version, os, platform)).toBe(expectedUrl);
  });
});
