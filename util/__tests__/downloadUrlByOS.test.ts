import { downloadUrlByOS } from '../downloadUrlByOS';

const version = 'v18.16.0';
describe('downloadUrlByOS', () => {
  it('returns the correct download URL for Mac', () => {
    const userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9';
    const userOS = 'MAC';
    const expectedUrl = 'https://nodejs.org/dist/v18.16.0/node-v18.16.0.pkg';

    expect(downloadUrlByOS({ userAgent, userOS, version })).toBe(expectedUrl);
  });

  it('returns the correct download URL for Windows (32-bit)', () => {
    const userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win32; x86) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36';
    const userOS = 'WIN';
    const bitness = '32';
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-x86.msi';

    expect(downloadUrlByOS({ userAgent, userOS, version, bitness })).toBe(
      expectedUrl
    );
  });

  it('returns the correct download URL for Windows (64-bit) because the userAgent contains Win64', () => {
    const userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246';
    const userOS = 'WIN';
    const bitness = '';
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi';

    expect(downloadUrlByOS({ userAgent, userOS, version, bitness })).toBe(
      expectedUrl
    );
  });

  it('returns the correct download URL for Windows (64-bit) because the userAgent contains WOW64', () => {
    const userAgent =
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36';
    const userOS = 'WIN';
    const bitness = '';
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi';

    expect(downloadUrlByOS({ userAgent, userOS, version, bitness })).toBe(
      expectedUrl
    );
  });

  it('returns the correct download URL for Windows (64-bit) because bitness = 64', () => {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
    const userOS = 'WIN';
    const bitness = '64';
    const expectedUrl =
      'https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi';

    expect(downloadUrlByOS({ userAgent, userOS, version, bitness })).toBe(
      expectedUrl
    );
  });

  it('returns the default download URL for other operating systems', () => {
    const userAgent = 'Mozilla/5.0 (Linux; Android 11; SM-G975U1)';
    const userOS = 'OTHER';
    const expectedUrl = 'https://nodejs.org/dist/v18.16.0/node-v18.16.0.tar.gz';

    expect(downloadUrlByOS({ userAgent, userOS, version })).toBe(expectedUrl);
  });
});
