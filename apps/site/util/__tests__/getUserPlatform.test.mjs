import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getUserPlatform } from '#site/util/getUserPlatform';

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
