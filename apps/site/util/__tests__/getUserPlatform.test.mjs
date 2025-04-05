import assert from 'node:assert';
import { describe, it } from 'node:test';

import { getUserPlatform } from '@/util/getUserPlatform';

describe('getUserPlatform', () => {
  it('should return arm64 for arm + 64', () => {
    assert.strictEqual(getUserPlatform('arm', '64'), 'arm64');
  });

  it('should return x64 for non-arm + 64', () => {
    assert.strictEqual(getUserPlatform('amd64', '64'), 'x64');
  });

  it('should return x86 otherwise', () => {
    assert.strictEqual(getUserPlatform('amd64', '32'), 'x86');
  });
});
