import assert from 'node:assert/strict';
import { describe, it, beforeEach } from 'node:test';

import { getHighEntropyValues } from '#site/util/getHighEntropyValues';

const mock = () => Promise.resolve({ platform: 'Win32', architecture: 'x86' });

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
    const hints = ['platform'];
    const result = await getHighEntropyValues(hints);
    assert.equal(result.platform, 'Win32');
  });

  it('should return an empty object on rejection', async () => {
    navigator.userAgentData.getHighEntropyValues = () => Promise.resolve({});
    const hints = ['platform'];
    const result = await getHighEntropyValues(hints);
    assert.equal(result.platform, undefined);
    navigator.userAgentData.getHighEntropyValues = mock;
  });

  it('should return multiple hint values', async () => {
    const hints = ['platform', 'architecture'];
    const result = await getHighEntropyValues(hints);
    assert.equal(result.platform, 'Win32');
    assert.equal(result.architecture, 'x86');
  });

  it('should return undefined for unsupported hints', async () => {
    const hints = ['unsupportedHint'];
    const result = await getHighEntropyValues(hints);
    assert.equal(result.unsupportedHint, undefined);
  });
});
