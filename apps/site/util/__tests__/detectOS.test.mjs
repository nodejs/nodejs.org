import { detectOsInUserAgent } from '@/util/detectOS';

describe('detectOsInUserAgent', () => {
  it.each([
    [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246',
      'WIN',
    ],
    [
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
      'MAC',
    ],
    [
      'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36',
      'OTHER',
    ],
    [
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1',
      'LINUX',
    ],
    [
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.3 Mobile/15E148 Safari/604.1',
      'MAC',
    ],
    ['', 'OTHER'],
    ['OTHERAgent/1.0', 'OTHER'],
    [undefined, 'OTHER'],
  ])('detectOsInUserAgent(%s) returns %s', (os, expected) => {
    expect(detectOsInUserAgent(os)).toBe(expected);
  });
});
