import assert from 'node:assert/strict';
import { describe, it, beforeEach } from 'node:test';

import {
  detectOS,
  detectOsInUserAgent,
  getHighEntropyValues,
  getUserPlatform,
} from '#site/util/userAgent';

const userAgentTestCases = [
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
];

const mock = () => Promise.resolve({ platform: 'Win32', architecture: 'x86' });

describe('getUserPlatform', () => {
  it('should return arm64 for arm + 64', () => {
    assert.equal(getUserPlatform('arm', '64'), 'arm64');
  });

  it('should return x64 for non-arm + 64', () => {
    assert.equal(getUserPlatform('amd64', '64'), 'x64');
  });

  it('should return x86 otherwise', () => {
    assert.equal(getUserPlatform('amd64', '32'), 'x86');
  });
});

describe('detectOsInUserAgent', () => {
  for (const [userAgent, expected] of userAgentTestCases) {
    it(`should return ${expected} for userAgent ${userAgent}`, () => {
      assert.equal(detectOsInUserAgent(userAgent), expected);
    });
  }

  it('should return OTHER if no match is found', () => {
    const result = detectOsInUserAgent('no-match');
    assert.equal(result, 'OTHER');
  });

  it('should detect Windows', () => {
    const result = detectOsInUserAgent('Mozilla Win something');
    assert.equal(result, 'WIN');
  });

  it('should detect Linux', () => {
    const result = detectOsInUserAgent('Mozilla/5.0 (X11; Linux x86_64)');
    assert.equal(result, 'LINUX');
  });
});

describe('detectOS', () => {
  it('should call detectOsInUserAgent', () => {
    Object.defineProperty(global, 'navigator', {
      value: { userAgent: 'Mac' },
      configurable: true,
    });
    assert.equal(detectOS(), 'MAC');
  });

  it('should return OTHER if navigator is undefined', () => {
    Object.defineProperty(global, 'navigator', {
      value: undefined,
      configurable: true,
    });
    assert.equal(detectOS(), 'OTHER');
  });
});

describe('getHighEntropyValues', () => {
  beforeEach(() => {
    Object.defineProperty(global, 'navigator', {
      value: {
        userAgentData: {
          getHighEntropyValues: mock,
        },
      },
      configurable: true,
    });
  });

  it('should resolve and return hint values', async () => {
    const result = await getHighEntropyValues(['platform']);
    assert.equal(result.platform, 'Win32');
  });

  it('should return an empty object on rejection', async () => {
    navigator.userAgentData.getHighEntropyValues = () => Promise.resolve({});
    const result = await getHighEntropyValues(['platform']);
    assert.equal(result.platform, undefined);
    navigator.userAgentData.getHighEntropyValues = mock;
  });

  it('should return multiple hint values', async () => {
    const result = await getHighEntropyValues(['platform', 'architecture']);
    assert.equal(result.platform, 'Win32');
    assert.equal(result.architecture, 'x86');
  });

  it('should return undefined for unsupported hints', async () => {
    const result = await getHighEntropyValues(['unsupportedHint']);
    assert.equal(result.unsupportedHint, undefined);
  });
});
